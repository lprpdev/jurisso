import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../entities/document.entity';
import { CacheService } from '../cache/cache.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
    private readonly cacheService: CacheService,
    private readonly auditService: AuditService,
  ) {}

  async findById(id: string): Promise<Document> {
    const cacheKey = `document:${id}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const document = await this.documentRepo.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    await this.cacheService.set(cacheKey, JSON.stringify(document), 3600);
    return document;
  }

  async findRelated(id: string, limit: number = 10) {
    const document = await this.findById(id);

    const cacheKey = `document:${id}:related:${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const qb = this.documentRepo.createQueryBuilder('doc');

    if (document.themes && document.themes.length > 0) {
      qb.where(`doc.themes && :themes`, { themes: document.themes });
    } else if (document.keywords && document.keywords.length > 0) {
      qb.where(`doc.keywords && :keywords`, { keywords: document.keywords });
    } else {
      qb.where(`doc.type = :type`, { type: document.type });
      if (document.jurisdiction) {
        qb.andWhere(`doc.jurisdiction = :jurisdiction`, { jurisdiction: document.jurisdiction });
      }
    }

    qb.andWhere('doc.id != :id', { id });
    qb.orderBy('doc."dateDecision"', 'DESC', 'NULLS LAST');
    qb.limit(limit);

    const related = await qb.getMany();

    await this.cacheService.set(cacheKey, JSON.stringify(related), 3600);
    return related;
  }

  async exportPdf(id: string, userId: string): Promise<{ content: string; title: string }> {
    const document = await this.findById(id);

    await this.auditService.log({
      userId,
      action: 'document.export_pdf',
      entityType: 'document',
      entityId: id,
    });

    return {
      title: document.title,
      content: document.content,
    };
  }

  async syncDocuments(documents: Partial<Document>[]): Promise<{ created: number; updated: number }> {
    let created = 0;
    let updated = 0;

    for (const docData of documents) {
      if (!docData.legifranceId) continue;

      const existing = await this.documentRepo.findOne({
        where: { legifranceId: docData.legifranceId },
      });

      if (existing) {
        await this.documentRepo.update(existing.id, docData as any);
        updated++;
      } else {
        const newDoc = this.documentRepo.create(docData);
        await this.documentRepo.save(newDoc);
        created++;
      }
    }

    this.logger.log(`Sync complete: ${created} created, ${updated} updated`);
    return { created, updated };
  }
}
