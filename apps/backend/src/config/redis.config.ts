import Redis from 'ioredis';

export function createRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL;

  const client = redisUrl
    ? new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times: number) {
          const delay = Math.min(times * 200, 5000);
          return delay;
        },
        lazyConnect: true,
      })
    : new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
        maxRetriesPerRequest: 3,
        retryStrategy(times: number) {
          const delay = Math.min(times * 200, 5000);
          return delay;
        },
        lazyConnect: true,
      });

  client.on('error', (err) => {
    console.error('Redis connection error:', err.message);
  });

  client.on('connect', () => {
    console.log('Redis connected successfully');
  });

  return client;
}
