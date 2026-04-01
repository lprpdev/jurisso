import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class ThrottleAuthGuard extends ThrottlerGuard {
  constructor(private readonly cacheService: CacheService) {
    super([] as any, {} as any, {} as any);
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || '0.0.0.0';
    const key = `throttle:auth:${ip}`;

    const currentStr = await this.cacheService.get(key);
    const current = currentStr ? parseInt(currentStr, 10) : 0;

    if (current >= limit) {
      throw new ThrottlerException();
    }

    await this.cacheService.set(key, String(current + 1), Math.ceil(ttl / 1000));
    return true;
  }
}
