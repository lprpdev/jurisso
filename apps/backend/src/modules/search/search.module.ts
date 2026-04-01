import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Document } from '../../entities/document.entity';
import { SearchHistory } from '../../entities/search-history.entity';
import { AppCacheModule } from '../cache/cache.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, SearchHistory]),
    AppCacheModule,
    AuditModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
