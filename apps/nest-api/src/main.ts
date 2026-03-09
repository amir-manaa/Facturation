/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/common/exceptions/http-exception.filter';
import { LoggerMiddleware } from '@api/common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Here we add global filter exception
  // app.useGlobalFilters(new HttpExceptionFilter());

  // mandatory for dto validation on controller and service
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs inconnus
      forbidNonWhitelisted: true, // erreur si champ en trop
      transform: true, // transforme en DTO
    })
  );

  // apply globally middleware
  // app.use(LoggerMiddleware);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
