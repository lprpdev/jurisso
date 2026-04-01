import { Controller, Get, Post, OnModuleInit } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { LegifranceService } from './modules/legifrance/legifrance.service';
import { Logger } from '@nestjs/common';

@ApiTags('Health')
@Controller('api')
export class HealthController implements OnModuleInit {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly legifranceService: LegifranceService,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async onModuleInit() {
    try {
      // Create trigger for auto-updating search vectors
      await this.documentRepo.query(`
        CREATE OR REPLACE FUNCTION documents_search_vector_update() RETURNS trigger AS $$
        BEGIN
          NEW."searchVector" :=
            setweight(to_tsvector('french', coalesce(NEW.title, '')), 'A') ||
            setweight(to_tsvector('french', coalesce(NEW.summary, '')), 'B') ||
            setweight(to_tsvector('french', coalesce(NEW.content, '')), 'C');
          RETURN NEW;
        END
        $$ LANGUAGE plpgsql;
      `);

      await this.documentRepo.query(`
        DROP TRIGGER IF EXISTS documents_search_vector_trigger ON documents;
        CREATE TRIGGER documents_search_vector_trigger
        BEFORE INSERT OR UPDATE OF title, summary, content ON documents
        FOR EACH ROW EXECUTE FUNCTION documents_search_vector_update();
      `);

      // Create GIN index if not exists
      await this.documentRepo.query(`
        CREATE INDEX IF NOT EXISTS idx_documents_search_vector_gin
        ON documents USING GIN ("searchVector");
      `);

      // Update existing documents with NULL search vectors
      const result = await this.documentRepo.query(`
        UPDATE documents SET "searchVector" =
          setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('french', coalesce(summary, '')), 'B') ||
          setweight(to_tsvector('french', coalesce(content, '')), 'C')
        WHERE "searchVector" IS NULL
      `);

      this.logger.log(`Search vectors initialized. ${result?.[1] ?? 0} documents updated.`);
    } catch (err) {
      this.logger.warn(`Search vector init: ${(err as Error).message}`);
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('sync')
  @ApiOperation({ summary: 'Trigger Judilibre sync (dev only)' })
  async sync() {
    const result = await this.legifranceService.syncDecisions(5);
    return { status: 'ok', ...result };
  }
}
