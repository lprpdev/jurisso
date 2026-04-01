import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annotation, AnnotationType } from '../../entities/annotation.entity';
import { Document } from '../../entities/document.entity';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectRepository(Annotation)
    private readonly annotationRepo: Repository<Annotation>,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async findByDocument(userId: string, documentId: string) {
    return this.annotationRepo.find({
      where: { userId, documentId },
      order: { startOffset: 'ASC', createdAt: 'ASC' },
    });
  }

  async findAll(userId: string, page: number | string = 1, limit: number | string = 20) {
    const p = typeof page === 'string' ? parseInt(page, 10) || 1 : page;
    const l = typeof limit === 'string' ? parseInt(limit, 10) || 20 : limit;
    const [annotations, total] = await this.annotationRepo.findAndCount({
      where: { userId },
      relations: ['document'],
      order: { updatedAt: 'DESC' },
      skip: (p - 1) * l,
      take: l,
    });

    return {
      data: annotations,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  async create(
    userId: string,
    documentId: string,
    data: {
      type?: AnnotationType;
      content?: string;
      selectedText?: string;
      startOffset?: number;
      endOffset?: number;
      color?: string;
    },
  ) {
    const document = await this.documentRepo.findOne({ where: { id: documentId } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const annotation = this.annotationRepo.create({
      userId,
      documentId,
      type: data.type || AnnotationType.NOTE,
      content: data.content || null,
      selectedText: data.selectedText || null,
      startOffset: data.startOffset ?? null,
      endOffset: data.endOffset ?? null,
      color: data.color || '#FBBF24',
    });

    return this.annotationRepo.save(annotation);
  }

  async update(
    userId: string,
    annotationId: string,
    data: Partial<{
      content: string;
      color: string;
      type: AnnotationType;
    }>,
  ) {
    const annotation = await this.annotationRepo.findOne({
      where: { id: annotationId },
    });

    if (!annotation) {
      throw new NotFoundException('Annotation not found');
    }

    if (annotation.userId !== userId) {
      throw new ForbiddenException('You do not own this annotation');
    }

    Object.assign(annotation, data);
    return this.annotationRepo.save(annotation);
  }

  async remove(userId: string, annotationId: string) {
    const annotation = await this.annotationRepo.findOne({
      where: { id: annotationId },
    });

    if (!annotation) {
      throw new NotFoundException('Annotation not found');
    }

    if (annotation.userId !== userId) {
      throw new ForbiddenException('You do not own this annotation');
    }

    await this.annotationRepo.remove(annotation);
    return { message: 'Annotation deleted' };
  }
}
