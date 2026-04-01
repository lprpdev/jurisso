import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert, AlertFrequency } from '../../entities/alert.entity';
import { AlertResult } from '../../entities/alert-result.entity';
import { SearchService } from '../search/search.service';

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    @InjectRepository(Alert)
    private readonly alertRepo: Repository<Alert>,
    @InjectRepository(AlertResult)
    private readonly alertResultRepo: Repository<AlertResult>,
    private readonly searchService: SearchService,
  ) {}

  async findAll(userId: string, page: number = 1, limit: number = 20) {
    const [alerts, total] = await this.alertRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: alerts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(userId: string, alertId: string) {
    const alert = await this.alertRepo.findOne({
      where: { id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    if (alert.userId !== userId) {
      throw new ForbiddenException('You do not own this alert');
    }

    const results = await this.alertResultRepo.find({
      where: { alertId },
      relations: ['document'],
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return { ...alert, results };
  }

  async create(
    userId: string,
    name: string,
    query: string,
    filters?: Record<string, unknown>,
    frequency?: AlertFrequency,
  ) {
    const alert = this.alertRepo.create({
      userId,
      name,
      query,
      filters: filters || null,
      frequency: frequency || AlertFrequency.DAILY,
    });

    return this.alertRepo.save(alert);
  }

  async update(
    userId: string,
    alertId: string,
    data: Partial<{
      name: string;
      query: string;
      filters: Record<string, unknown>;
      frequency: AlertFrequency;
    }>,
  ) {
    const alert = await this.alertRepo.findOne({ where: { id: alertId } });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    if (alert.userId !== userId) {
      throw new ForbiddenException('You do not own this alert');
    }

    Object.assign(alert, data);
    return this.alertRepo.save(alert);
  }

  async toggle(userId: string, alertId: string) {
    const alert = await this.alertRepo.findOne({ where: { id: alertId } });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    if (alert.userId !== userId) {
      throw new ForbiddenException('You do not own this alert');
    }

    alert.isActive = !alert.isActive;
    return this.alertRepo.save(alert);
  }

  async remove(userId: string, alertId: string) {
    const alert = await this.alertRepo.findOne({ where: { id: alertId } });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    if (alert.userId !== userId) {
      throw new ForbiddenException('You do not own this alert');
    }

    await this.alertRepo.remove(alert);
    return { message: 'Alert deleted' };
  }

  async markResultSeen(userId: string, resultId: string) {
    const result = await this.alertResultRepo.findOne({
      where: { id: resultId },
      relations: ['alert'],
    });

    if (!result) {
      throw new NotFoundException('Alert result not found');
    }

    if (result.alert.userId !== userId) {
      throw new ForbiddenException('You do not own this alert');
    }

    result.seen = true;
    return this.alertResultRepo.save(result);
  }

  async triggerAlerts(frequency: AlertFrequency): Promise<number> {
    const alerts = await this.alertRepo.find({
      where: { isActive: true, frequency },
    });

    let totalNewResults = 0;

    for (const alert of alerts) {
      try {
        const searchResults = await this.searchService.search({
          q: alert.query,
          ...(alert.filters as Record<string, unknown> || {}),
          page: 1,
          limit: 20,
          sort: 'date_desc',
        } as any);

        const lastTriggered = alert.lastTriggeredAt || new Date(0);

        for (const doc of searchResults.data) {
          if (doc.createdAt > lastTriggered) {
            const existing = await this.alertResultRepo.findOne({
              where: { alertId: alert.id, documentId: doc.id },
            });

            if (!existing) {
              const result = this.alertResultRepo.create({
                alertId: alert.id,
                documentId: doc.id,
              });
              await this.alertResultRepo.save(result);
              totalNewResults++;
            }
          }
        }

        alert.lastTriggeredAt = new Date();
        await this.alertRepo.save(alert);
      } catch (err) {
        this.logger.error(`Failed to trigger alert ${alert.id}: ${(err as Error).message}`);
      }
    }

    this.logger.log(`Triggered ${alerts.length} ${frequency} alerts, ${totalNewResults} new results`);
    return totalNewResults;
  }
}
