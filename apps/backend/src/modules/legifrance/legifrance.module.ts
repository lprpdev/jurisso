import { Module } from '@nestjs/common';
import { LegifranceService } from './legifrance.service';
import { LegifranceScheduler } from './legifrance.scheduler';
import { DocumentsModule } from '../documents/documents.module';
import { AppCacheModule } from '../cache/cache.module';

@Module({
  imports: [DocumentsModule, AppCacheModule],
  providers: [LegifranceService, LegifranceScheduler],
  exports: [LegifranceService],
})
export class LegifranceModule {}
