import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../entities/favorite.entity';
import { Document } from '../../entities/document.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async findAll(userId: string, page: number | string = 1, limit: number | string = 20) {
    const p = typeof page === 'string' ? parseInt(page, 10) || 1 : page;
    const l = typeof limit === 'string' ? parseInt(limit, 10) || 20 : limit;
    const [favorites, total] = await this.favoriteRepo.findAndCount({
      where: { userId },
      relations: ['document'],
      order: { createdAt: 'DESC' },
      skip: (p - 1) * l,
      take: l,
    });

    return {
      data: favorites,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  async create(userId: string, documentId: string, note?: string) {
    const document = await this.documentRepo.findOne({ where: { id: documentId } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const existing = await this.favoriteRepo.findOne({
      where: { userId, documentId },
    });
    if (existing) {
      throw new ConflictException('Document already in favorites');
    }

    const favorite = this.favoriteRepo.create({
      userId,
      documentId,
      note: note || null,
    });

    return this.favoriteRepo.save(favorite);
  }

  async update(userId: string, favoriteId: string, note: string) {
    const favorite = await this.favoriteRepo.findOne({
      where: { id: favoriteId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    if (favorite.userId !== userId) {
      throw new ForbiddenException('You do not own this favorite');
    }

    favorite.note = note;
    return this.favoriteRepo.save(favorite);
  }

  async remove(userId: string, favoriteId: string) {
    const favorite = await this.favoriteRepo.findOne({
      where: { id: favoriteId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    if (favorite.userId !== userId) {
      throw new ForbiddenException('You do not own this favorite');
    }

    await this.favoriteRepo.remove(favorite);
    return { message: 'Favorite removed' };
  }

  async checkFavorite(userId: string, documentId: string) {
    const favorite = await this.favoriteRepo.findOne({
      where: { userId, documentId },
    });
    return { isFavorite: !!favorite, favoriteId: favorite?.id || null };
  }
}
