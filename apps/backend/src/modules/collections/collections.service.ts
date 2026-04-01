import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../../entities/collection.entity';
import { CollectionDocument } from '../../entities/collection-document.entity';
import { Document } from '../../entities/document.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
    @InjectRepository(CollectionDocument)
    private readonly collectionDocRepo: Repository<CollectionDocument>,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async findAll(userId: string, page: number = 1, limit: number = 20) {
    const [collections, total] = await this.collectionRepo.findAndCount({
      where: { userId },
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = await Promise.all(
      collections.map(async (c) => {
        const count = await this.collectionDocRepo.count({
          where: { collectionId: c.id },
        });
        return { ...c, documentCount: count };
      }),
    );

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(userId: string, collectionId: string) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId && !collection.isPublic) {
      throw new ForbiddenException('You do not have access to this collection');
    }

    const documents = await this.collectionDocRepo.find({
      where: { collectionId },
      relations: ['document'],
      order: { position: 'ASC' },
    });

    return {
      ...collection,
      documents: documents.map((cd) => ({
        ...cd.document,
        note: cd.note,
        position: cd.position,
        addedAt: cd.addedAt,
      })),
    };
  }

  async create(
    userId: string,
    name: string,
    description?: string,
    color?: string,
    isPublic?: boolean,
  ) {
    const collection = this.collectionRepo.create({
      userId,
      name,
      description: description || null,
      color: color || '#3B82F6',
      isPublic: isPublic || false,
    });

    return this.collectionRepo.save(collection);
  }

  async update(
    userId: string,
    collectionId: string,
    data: Partial<{ name: string; description: string; color: string; isPublic: boolean }>,
  ) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new ForbiddenException('You do not own this collection');
    }

    Object.assign(collection, data);
    return this.collectionRepo.save(collection);
  }

  async remove(userId: string, collectionId: string) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new ForbiddenException('You do not own this collection');
    }

    await this.collectionRepo.remove(collection);
    return { message: 'Collection deleted' };
  }

  async addDocument(
    userId: string,
    collectionId: string,
    documentId: string,
    note?: string,
  ) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new ForbiddenException('You do not own this collection');
    }

    const document = await this.documentRepo.findOne({ where: { id: documentId } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const existing = await this.collectionDocRepo.findOne({
      where: { collectionId, documentId },
    });

    if (existing) {
      throw new ConflictException('Document already in collection');
    }

    const maxPos = await this.collectionDocRepo
      .createQueryBuilder('cd')
      .select('MAX(cd.position)', 'max')
      .where('cd."collectionId" = :collectionId', { collectionId })
      .getRawOne();

    const position = (maxPos?.max ?? -1) + 1;

    const cd = this.collectionDocRepo.create({
      collectionId,
      documentId,
      note: note || null,
      position,
    });

    return this.collectionDocRepo.save(cd);
  }

  async removeDocument(userId: string, collectionId: string, documentId: string) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new ForbiddenException('You do not own this collection');
    }

    const cd = await this.collectionDocRepo.findOne({
      where: { collectionId, documentId },
    });

    if (!cd) {
      throw new NotFoundException('Document not in collection');
    }

    await this.collectionDocRepo.remove(cd);
    return { message: 'Document removed from collection' };
  }

  async reorderDocuments(
    userId: string,
    collectionId: string,
    documentIds: string[],
  ) {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new ForbiddenException('You do not own this collection');
    }

    for (let i = 0; i < documentIds.length; i++) {
      await this.collectionDocRepo.update(
        { collectionId, documentId: documentIds[i] },
        { position: i },
      );
    }

    return { message: 'Documents reordered' };
  }
}
