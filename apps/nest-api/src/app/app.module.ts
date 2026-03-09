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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '@api/common/modules/db.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@api/common/exceptions/http-exception.filter';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
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
