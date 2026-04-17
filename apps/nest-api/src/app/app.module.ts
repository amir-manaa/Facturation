import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '@api/common/middlewares/logger.middleware';
import { UsersModule } from '@api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@api/app/infrastructure/database/db.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@api/common/exceptions/http-exception.filter';
import { AuthModule } from '@api/app/features/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RediseCacheModule } from '@api/app/infrastructure/cache/cache.module';
import { LoggerModule } from '@api/common/modules/logger.module';
import { QueueModule } from '@api/app/infrastructure/queue/queue.module';
import { SocketModule } from '@api/app/infrastructure/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    CacheModule.register(),
    RediseCacheModule,
    DbModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    QueueModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ConfigService,
    // here we also add filter globally
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'getPromise', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    //.forRoutes(AppController);
  }
}
