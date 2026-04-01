import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { CacheService } from './cache.service';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class AppCacheModule implements OnModuleDestroy {
  constructor(private readonly cacheService: CacheService) {}

  async onModuleDestroy() {
    await this.cacheService.disconnect();
  }
}
