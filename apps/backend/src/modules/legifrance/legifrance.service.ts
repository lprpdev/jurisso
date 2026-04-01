import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentsService } from '../documents/documents.service';
import { CacheService } from '../cache/cache.service';
import { DocumentType, Jurisdiction } from '../../entities/document.entity';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class LegifranceService {
  private readonly logger = new Logger(LegifranceService.name);
  private readonly apiBaseUrl: string;
  private readonly oauthUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private lastRequestTime = 0;
  private readonly minRequestInterval = 100; // 10 req/s max = 100ms between requests

  constructor(
    private readonly configService: ConfigService,
    private readonly documentsService: DocumentsService,
    private readonly cacheService: CacheService,
  ) {
    this.apiBaseUrl = this.configService.get<string>(
      'LEGIFRANCE_API_URL',
      'https://api.piste.gouv.fr/dila/legifrance/lf-engine-app',
    );
    this.oauthUrl = this.configService.get<string>(
      'LEGIFRANCE_OAUTH_URL',
      'https://oauth.piste.gouv.fr/api/oauth/token',
    );
    this.clientId = this.configService.get<string>('LEGIFRANCE_CLIENT_ID', '');
    this.clientSecret = this.configService.get<string>('LEGIFRANCE_CLIENT_SECRET', '');
  }

  private async getAccessToken(): Promise<string> {
    const cachedToken = await this.cacheService.get('legifrance:access_token');
    if (cachedToken) {
      return cachedToken;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('scope', 'openid');

    const response = await fetch(this.oauthUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`OAuth token request failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as TokenResponse;
    const ttl = Math.max(data.expires_in - 60, 60);
    await this.cacheService.set('legifrance:access_token', data.access_token, ttl);

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

  private async apiRequest<T>(endpoint: string, body?: unknown): Promise<T> {
    const token = await this.getAccessToken();

    const response = await this.rateLimitedFetch(`${this.apiBaseUrl}${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Legifrance API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  async syncDecisions(dateFrom?: string): Promise<{ created: number; updated: number }> {
    this.logger.log(`Starting decisions sync from ${dateFrom || 'beginning'}...`);

    const searchDate = dateFrom || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const result = await this.apiRequest<{
        results: Array<{
          id: string;
          title: string;
          text: string;
          date: string;
          numero: string;
          ecli: string;
          juridiction: string;
          chambre: string;
          themes: string[];
        }>;
      }>('/search', {
        fond: 'JURI',
        recherche: {
          champs: [{ typeChamp: 'ALL', criteres: [{ typeRecherche: 'TOUS_LES_MOTS_DANS_UN_CHAMP', valeur: '*' }] }],
          filtres: [{ facette: 'DATE_DECISION', dates: { start: searchDate } }],
          pageNumber: 1,
          pageSize: 100,
          sort: 'DATE_DESC',
        },
      });

      if (!result.results || result.results.length === 0) {
        this.logger.log('No new decisions found');
        return { created: 0, updated: 0 };
      }

      const documents = result.results.map((item) => ({
        legifranceId: item.id,
        type: DocumentType.DECISION,
        title: item.title || 'Decision sans titre',
        content: item.text || '',
        reference: item.numero || null,
        numberEcli: item.ecli || null,
        jurisdiction: this.mapJurisdiction(item.juridiction),
        chamber: item.chambre || null,
        dateDecision: item.date ? new Date(item.date) : null,
        themes: item.themes || [],
        keywords: [],
      }));

      return this.documentsService.syncDocuments(documents);
    } catch (err) {
      this.logger.error(`Decisions sync failed: ${(err as Error).message}`);
      return { created: 0, updated: 0 };
    }
  }

  async syncLegislation(dateFrom?: string): Promise<{ created: number; updated: number }> {
    this.logger.log(`Starting legislation sync from ${dateFrom || 'beginning'}...`);

    const searchDate = dateFrom || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const result = await this.apiRequest<{
        results: Array<{
          id: string;
          title: string;
          text: string;
          datePublication: string;
          numero: string;
          nature: string;
          themes: string[];
        }>;
      }>('/search', {
        fond: 'LEGI',
        recherche: {
          champs: [{ typeChamp: 'ALL', criteres: [{ typeRecherche: 'TOUS_LES_MOTS_DANS_UN_CHAMP', valeur: '*' }] }],
          filtres: [{ facette: 'DATE_SIGNATURE', dates: { start: searchDate } }],
          pageNumber: 1,
          pageSize: 100,
          sort: 'DATE_DESC',
        },
      });

      if (!result.results || result.results.length === 0) {
        this.logger.log('No new legislation found');
        return { created: 0, updated: 0 };
      }

      const documents = result.results.map((item) => ({
        legifranceId: item.id,
        type: this.mapLegislationType(item.nature),
        title: item.title || 'Texte sans titre',
        content: item.text || '',
        reference: item.numero || null,
        datePublication: item.datePublication ? new Date(item.datePublication) : null,
        themes: item.themes || [],
        keywords: [],
      }));

      return this.documentsService.syncDocuments(documents);
    } catch (err) {
      this.logger.error(`Legislation sync failed: ${(err as Error).message}`);
      return { created: 0, updated: 0 };
    }
  }

  async fullSync(): Promise<void> {
    this.logger.log('Starting full sync...');

    const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const decisionsResult = await this.syncDecisions(oneYearAgo);
    const legislationResult = await this.syncLegislation(oneYearAgo);

    this.logger.log(
      `Full sync complete. Decisions: ${decisionsResult.created} created, ${decisionsResult.updated} updated. ` +
        `Legislation: ${legislationResult.created} created, ${legislationResult.updated} updated.`,
    );
  }

  private mapJurisdiction(juridiction: string): Jurisdiction {
    const mapping: Record<string, Jurisdiction> = {
      'Cour de cassation': Jurisdiction.COUR_CASSATION,
      'Conseil d\'Etat': Jurisdiction.CONSEIL_ETAT,
      'Conseil constitutionnel': Jurisdiction.CONSEIL_CONSTITUTIONNEL,
      'Cour d\'appel': Jurisdiction.COUR_APPEL,
      'Tribunal judiciaire': Jurisdiction.TRIBUNAL_JUDICIAIRE,
      'Tribunal administratif': Jurisdiction.TRIBUNAL_ADMINISTRATIF,
      'Cour administrative d\'appel': Jurisdiction.COUR_ADMINISTRATIVE_APPEL,
    };

    for (const [key, value] of Object.entries(mapping)) {
      if (juridiction?.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return Jurisdiction.AUTRE;
  }

  private mapLegislationType(nature: string): DocumentType {
    const mapping: Record<string, DocumentType> = {
      loi: DocumentType.LOI,
      decret: DocumentType.DECRET,
      arrete: DocumentType.ARRETE,
      circulaire: DocumentType.CIRCULAIRE,
      code: DocumentType.CODE,
      article: DocumentType.ARTICLE,
    };

    const normalized = nature?.toLowerCase() || '';
    for (const [key, value] of Object.entries(mapping)) {
      if (normalized.includes(key)) {
        return value;
      }
    }

    return DocumentType.LOI;
  }
}
