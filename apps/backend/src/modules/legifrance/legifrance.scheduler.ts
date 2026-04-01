import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LegifranceService } from './legifrance.service';

@Injectable()
export class LegifranceScheduler {
  private readonly logger = new Logger(LegifranceScheduler.name);

  constructor(private readonly legifranceService: LegifranceService) {}

  @Cron('0 2 * * *', { name: 'daily-legifrance-sync', timeZone: 'Europe/Paris' })
  async dailySync() {
    this.logger.log('Starting daily Judilibre sync...');
    try {
      const result = await this.legifranceService.syncDecisions(5);
      this.logger.log(
        `Daily sync complete: ${result.created} created, ${result.updated} updated`,
      );
    } catch (err) {
      this.logger.error(`Daily sync failed: ${(err as Error).message}`);
    }
  }

  @Cron('0 1 * * 0', { name: 'weekly-full-sync', timeZone: 'Europe/Paris' })
  async weeklyFullSync() {
    this.logger.log('Starting weekly full sync...');
    try {
      await this.legifranceService.fullSync();
      this.logger.log('Weekly full sync completed');
    } catch (err) {
      this.logger.error(`Weekly full sync failed: ${(err as Error).message}`);
    }
  }
}
