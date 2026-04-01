import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/audit-log.entity';

export interface AuditLogEntry {
  userId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
  ) {}

  async log(entry: AuditLogEntry): Promise<AuditLog> {
    try {
      const auditLog = this.auditLogRepo.create({
        userId: entry.userId || null,
        action: entry.action,
        entityType: entry.entityType || null,
        entityId: entry.entityId || null,
        details: entry.details || null,
        ipAddress: entry.ipAddress || null,
        userAgent: entry.userAgent?.substring(0, 500) || null,
      });

      return await this.auditLogRepo.save(auditLog);
    } catch (err) {
      this.logger.error(`Failed to create audit log: ${(err as Error).message}`);
      throw err;
    }
  }

  async findByUser(userId: string, page: number = 1, limit: number = 50) {
    const [logs, total] = await this.auditLogRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByAction(action: string, page: number = 1, limit: number = 50) {
    const [logs, total] = await this.auditLogRepo.findAndCount({
      where: { action },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
