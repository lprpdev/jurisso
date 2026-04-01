import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentType } from '../../entities/document.entity';
import { CacheService } from '../cache/cache.service';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface JudilibreResult {
  id: string;
  jurisdiction: string;
  chamber: string;
  number: string;
  numbers: string[];
  ecli: string;
  formation: string;
  publication: string[];
  decision_date: string;
  solution: string;
  type: string;
  summary: string;
  themes: string[];
  text: string;
  highlights?: {
    text?: string[];
  };
}

interface JudilibreResponse {
  page: number;
  page_size: number;
  total: number;
  next_page: string | null;
  results: JudilibreResult[];
}

@Injectable()
export class LegifranceService {
  private readonly logger = new Logger(LegifranceService.name);
  private readonly apiBaseUrl: string;
  private readonly oauthUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly apiKey: string;
  private lastRequestTime = 0;
  private readonly minRequestInterval = 100;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
    private readonly cacheService: CacheService,
  ) {
    this.apiBaseUrl = this.configService.get<string>(
      'LEGIFRANCE_API_URL',
      'https://sandbox-api.piste.gouv.fr',
    );
    this.oauthUrl = this.configService.get<string>(
      'LEGIFRANCE_OAUTH_URL',
      'https://sandbox-oauth.piste.gouv.fr/api/oauth/token',
    );
    this.clientId = this.configService.get<string>('LEGIFRANCE_CLIENT_ID', '');
    this.clientSecret = this.configService.get<string>('LEGIFRANCE_CLIENT_SECRET', '');
    this.apiKey = this.configService.get<string>('LEGIFRANCE_API_KEY', '');
  }

  private async getAccessToken(): Promise<string> {
    const cachedToken = await this.cacheService.get('legifrance:access_token');
    if (cachedToken) return cachedToken;

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('scope', 'openid');

    this.logger.log('Requesting PISTE OAuth token...');

    const response = await fetch(this.oauthUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OAuth failed: ${response.status} - ${text}`);
    }

    const data = (await response.json()) as TokenResponse;
    const ttl = Math.max(data.expires_in - 60, 60);
    await this.cacheService.set('legifrance:access_token', data.access_token, ttl);

    this.logger.log('PISTE OAuth token obtained');
    return data.access_token;
  }

  private async rateLimitedFetch(url: string, options: RequestInit): Promise<Response> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    if (elapsed < this.minRequestInterval) {
      await new Promise((resolve) => setTimeout(resolve, this.minRequestInterval - elapsed));
    }
    this.lastRequestTime = Date.now();
    return fetch(url, options);
  }

  /** Search Judilibre — used for real-time search passthrough */
  async searchJudilibre(
    query: string,
    pageSize = 10,
    page = 0,
  ): Promise<JudilibreResponse> {
    const token = await this.getAccessToken();
    const params = new URLSearchParams({
      query,
      page_size: String(pageSize),
      page: String(page),
    });

    const response = await this.rateLimitedFetch(
      `${this.apiBaseUrl}/cassation/judilibre/v1.0/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          KeyId: this.apiKey,
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Judilibre search failed: ${response.status} - ${text}`);
    }

    return (await response.json()) as JudilibreResponse;
  }

  /** Sync decisions from Judilibre into local DB */
  async syncDecisions(maxPages = 10): Promise<{ created: number; updated: number }> {
    this.logger.log('Syncing decisions from Judilibre...');

    let created = 0;
    let updated = 0;
    let page = 0;
    let hasMore = true;

    while (hasMore && page < maxPages) {
      try {
        const result = await this.searchJudilibre('*', 50, page);

        if (!result.results || result.results.length === 0) {
          hasMore = false;
          break;
        }

        for (const item of result.results) {
          try {
            const existing = await this.documentRepo.findOne({
              where: { legifranceId: item.id },
            });

            const title = item.summary
              ? item.summary.substring(0, 500)
              : `Decision n° ${item.number || item.id}`;

            const docData: Partial<Document> = {
              legifranceId: item.id,
              type: DocumentType.DECISION,
              title,
              content: item.text || '',
              summary: item.summary || null,
              reference: item.number || null,
              numberEcli: item.ecli || null,
              numberPourvoi: item.number || null,
              jurisdiction: this.mapJurisdiction(item.jurisdiction) as any,
              chamber: item.chamber || null,
              dateDecision: item.decision_date ? new Date(item.decision_date) : null,
              themes: item.themes || [],
              keywords: [item.solution, item.formation, item.type].filter(Boolean) as string[],
              metadata: {
                solution: item.solution,
                formation: item.formation,
                publication: item.publication,
                source: 'judilibre',
                urlSource: `https://www.courdecassation.fr/decision/${item.id}`,
              },
            };

            if (existing) {
              await this.documentRepo.update(existing.id, docData as any);
              updated++;
            } else {
              const newDoc = this.documentRepo.create(docData);
              await this.documentRepo.save(newDoc);
              created++;
            }
          } catch (err) {
            this.logger.warn(`Failed to save decision ${item.id}: ${(err as Error).message}`);
          }
        }

        hasMore = result.next_page !== null;
        page++;
        this.logger.log(`Page ${page}: ${result.results.length} decisions (total: ${created} created, ${updated} updated)`);
      } catch (err) {
        this.logger.error(`Sync page ${page} failed: ${(err as Error).message}`);
        hasMore = false;
      }
    }

    // Update search vectors
    await this.updateSearchVectors();

    this.logger.log(`Sync complete: ${created} created, ${updated} updated`);
    return { created, updated };
  }

  /** Rebuild PostgreSQL tsvector for full-text search */
  private async updateSearchVectors(): Promise<void> {
    try {
      await this.documentRepo.query(`
        UPDATE documents SET search_vector =
          setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('french', coalesce(summary, '')), 'B') ||
          setweight(to_tsvector('french', coalesce(content, '')), 'C')
        WHERE search_vector IS NULL
      `);
      this.logger.log('Search vectors updated');
    } catch (err) {
      this.logger.error(`Search vector update failed: ${(err as Error).message}`);
    }
  }

  async fullSync(): Promise<void> {
    this.logger.log('Starting full sync...');
    await this.syncDecisions(50);
    this.logger.log('Full sync complete');
  }

  private mapJurisdiction(code: string): string {
    const mapping: Record<string, string> = {
      cc: 'cour_cassation',
      ca: 'cour_appel',
      tj: 'tribunal_judiciaire',
      ce: 'conseil_etat',
      caa: 'cour_administrative_appel',
      ta: 'tribunal_administratif',
    };
    return mapping[code] || 'autre';
  }
}
