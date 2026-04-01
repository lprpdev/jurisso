import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../entities/document.entity';
import { SearchHistory } from '../../entities/search-history.entity';
import { CacheService } from '../cache/cache.service';
import { SearchQueryDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
    @InjectRepository(SearchHistory)
    private readonly searchHistoryRepo: Repository<SearchHistory>,
    private readonly cacheService: CacheService,
  ) {}

  async search(dto: SearchQueryDto, userId?: string) {
    const cacheKey = `search:${JSON.stringify(dto)}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const page = dto.page || 1;
    const limit = dto.limit || 20;
    const offset = (page - 1) * limit;

    const qb = this.documentRepo.createQueryBuilder('doc');

    qb.addSelect(
      `ts_rank(doc."searchVector", websearch_to_tsquery('french', :query))`,
      'rank',
    );

    qb.addSelect(
      `ts_headline('french', doc.content, websearch_to_tsquery('french', :query), 'MaxWords=50, MinWords=20, StartSel=<mark>, StopSel=</mark>')`,
      'highlight',
    );

    qb.where(
      `doc."searchVector" @@ websearch_to_tsquery('french', :query)`,
      { query: dto.q },
    );

    if (dto.type) {
      qb.andWhere('doc.type = :type', { type: dto.type });
    }

    if (dto.jurisdiction) {
      qb.andWhere('doc.jurisdiction = :jurisdiction', { jurisdiction: dto.jurisdiction });
    }

    if (dto.dateFrom) {
      qb.andWhere('doc."dateDecision" >= :dateFrom', { dateFrom: dto.dateFrom });
    }

    if (dto.dateTo) {
      qb.andWhere('doc."dateDecision" <= :dateTo', { dateTo: dto.dateTo });
    }

    if (dto.theme) {
      qb.andWhere(`doc.themes @> :theme`, { theme: JSON.stringify([dto.theme]) });
    }

    switch (dto.sort) {
      case 'date_asc':
        qb.orderBy('doc."dateDecision"', 'ASC', 'NULLS LAST');
        break;
      case 'date_desc':
        qb.orderBy('doc."dateDecision"', 'DESC', 'NULLS LAST');
        break;
      default:
        qb.orderBy('rank', 'DESC');
        break;
    }

    const totalQb = qb.clone();

    qb.offset(offset).limit(limit);

    const [rawResults, total] = await Promise.all([
      qb.getRawAndEntities(),
      totalQb.getCount(),
    ]);

    const results = rawResults.entities.map((entity, index) => ({
      ...entity,
      highlight: rawResults.raw[index]?.highlight || null,
      rank: rawResults.raw[index]?.rank || 0,
    }));

    const response = {
      data: results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      query: dto.q,
    };

    await this.cacheService.set(cacheKey, JSON.stringify(response), 300);

    if (userId) {
      const history = this.searchHistoryRepo.create({
        userId,
        query: dto.q,
        filters: {
          type: dto.type,
          jurisdiction: dto.jurisdiction,
          dateFrom: dto.dateFrom,
          dateTo: dto.dateTo,
          theme: dto.theme,
        },
        resultsCount: total,
      });
      await this.searchHistoryRepo.save(history).catch((err) => {
        this.logger.warn(`Failed to save search history: ${err.message}`);
      });
    }

    return response;
  }

  async suggest(query: string, limit: number = 10) {
    if (query.length < 2) {
      return [];
    }

    const cacheKey = `suggest:${query}:${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const results = await this.documentRepo
      .createQueryBuilder('doc')
      .select(['doc.id', 'doc.title', 'doc.type', 'doc.reference'])
      .where(
        `doc."searchVector" @@ to_tsquery('french', :query)`,
        { query: query.split(/\s+/).join(' & ') + ':*' },
      )
      .orderBy(
        `ts_rank(doc."searchVector", to_tsquery('french', :query))`,
        'DESC',
      )
      .limit(limit)
      .getMany();

    const suggestions = results.map((doc) => ({
      id: doc.id,
      title: doc.title,
      type: doc.type,
      reference: doc.reference,
    }));

    await this.cacheService.set(cacheKey, JSON.stringify(suggestions), 300);

    return suggestions;
  }

  async getHistory(userId: string, page: number = 1, limit: number = 20) {
    const [history, total] = await this.searchHistoryRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: history,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async deleteHistory(userId: string) {
    await this.searchHistoryRepo.delete({ userId });
    return { message: 'Search history cleared' };
  }

  async deleteHistoryEntry(userId: string, entryId: string) {
    const entry = await this.searchHistoryRepo.findOne({
      where: { id: entryId, userId },
    });

    if (!entry) {
      return { message: 'Entry not found' };
    }

    await this.searchHistoryRepo.remove(entry);
    return { message: 'Search history entry deleted' };
  }
}
