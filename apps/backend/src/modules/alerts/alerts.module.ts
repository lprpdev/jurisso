import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { AlertsScheduler } from './alerts.scheduler';
import { Alert } from '../../entities/alert.entity';
import { AlertResult } from '../../entities/alert-result.entity';
import { Document } from '../../entities/document.entity';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert, AlertResult, Document]),
    SearchModule,
  ],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsScheduler],
  exports: [AlertsService],
})
export class AlertsModule {}
