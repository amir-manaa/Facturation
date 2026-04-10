import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      // registerAsync allow to use env var (ConfigService)
      useFactory: (config: ConfigService) => ({
        store: redisStore,

        // Connect Redis
        socket: {
          host: config.get('REDIS_HOST') ?? 'localhost',
          port: config.get('REDIS_PORT') ?? 6379,
        },
        password: config.get('REDIS_PASSWORD') ?? undefined,

        // TTL default: 60 seconds
        ttl: 60 * 1000,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RediseCacheModule {}
