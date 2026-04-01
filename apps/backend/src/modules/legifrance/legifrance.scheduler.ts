import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LegifranceService } from './legifrance.service';

@Injectable()
export class LegifranceScheduler {
  private readonly logger = new Logger(LegifranceScheduler.name);

  constructor(private readonly legifranceService: LegifranceService) {}

  @Cron('0 2 * * *', { name: 'daily-legifrance-sync', timeZone: 'Europe/Paris' })
  async dailySync() {
    this.logger.log('Starting daily Legifrance sync...');
    try {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const decisions = await this.legifranceService.syncDecisions(yesterday);
      const legislation = await this.legifranceService.syncLegislation(yesterday);

      this.logger.log(
        `Daily sync complete. Decisions: ${decisions.created}c/${decisions.updated}u. ` +
          `Legislation: ${legislation.created}c/${legislation.updated}u.`,
      );
    } catch (err) {
      this.logger.error(`Daily Legifrance sync failed: ${(err as Error).message}`);
    }
  }

  @Cron('0 1 * * 0', { name: 'weekly-full-legifrance-sync', timeZone: 'Europe/Paris' })
  async weeklyFullSync() {
    this.logger.log('Starting weekly full Legifrance sync...');
    try {
      await this.legifranceService.fullSync();
      this.logger.log('Weekly full sync completed successfully');
    } catch (err) {
      this.logger.error(`Weekly full Legifrance sync failed: ${(err as Error).message}`);
    }
  }
}
