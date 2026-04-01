import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegifranceService } from './legifrance.service';
import { LegifranceScheduler } from './legifrance.scheduler';
import { Document } from '../../entities/document.entity';
import { AppCacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), AppCacheModule],
  providers: [LegifranceService, LegifranceScheduler],
  exports: [LegifranceService],
})
export class LegifranceModule {}
