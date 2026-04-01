import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlertsService } from './alerts.service';
import { AlertFrequency } from '../../entities/alert.entity';

@Injectable()
export class AlertsScheduler {
  private readonly logger = new Logger(AlertsScheduler.name);

  constructor(private readonly alertsService: AlertsService) {}

  @Cron('0 8 * * *', { name: 'daily-alerts', timeZone: 'Europe/Paris' })
  async triggerDailyAlerts() {
    this.logger.log('Triggering daily alerts...');
    try {
      const count = await this.alertsService.triggerAlerts(AlertFrequency.DAILY);
      this.logger.log(`Daily alerts completed: ${count} new results`);
    } catch (err) {
      this.logger.error(`Daily alerts failed: ${(err as Error).message}`);
    }
  }

  @Cron('0 8 * * 1', { name: 'weekly-alerts', timeZone: 'Europe/Paris' })
  async triggerWeeklyAlerts() {
    this.logger.log('Triggering weekly alerts...');
    try {
      const count = await this.alertsService.triggerAlerts(AlertFrequency.WEEKLY);
      this.logger.log(`Weekly alerts completed: ${count} new results`);
    } catch (err) {
      this.logger.error(`Weekly alerts failed: ${(err as Error).message}`);
    }
  }
}
