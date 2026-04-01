import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { createRedisClient } from '../../config/redis.config';

@Injectable()
export class CacheService implements OnModuleInit {
  private readonly logger = new Logger(CacheService.name);
  private client!: Redis;

  async onModuleInit() {
    this.client = createRedisClient();
    try {
      await this.client.connect();
    } catch (err) {
      this.logger.warn(`Redis connection failed: ${(err as Error).message}. Cache will be unavailable.`);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      this.logger.warn(`Cache get failed for key ${key}: ${(err as Error).message}`);
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (err) {
      this.logger.warn(`Cache set failed for key ${key}: ${(err as Error).message}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      this.logger.warn(`Cache del failed for key ${key}: ${(err as Error).message}`);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (err) {
      this.logger.warn(`Cache exists check failed for key ${key}: ${(err as Error).message}`);
      return false;
    }
  }

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(...keys);
      }
    } catch (err) {
      this.logger.warn(`Cache delPattern failed for ${pattern}: ${(err as Error).message}`);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
    } catch (err) {
      this.logger.warn(`Redis disconnect failed: ${(err as Error).message}`);
    }
  }
}
