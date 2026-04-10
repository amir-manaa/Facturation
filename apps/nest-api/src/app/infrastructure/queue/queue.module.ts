import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { WelcomeEmailHandler } from './jobs/handlers/welcome-email.handler';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') ?? 'localhost',
          port: config.get('REDIS_PORT') ?? 6379,
        },
      }),
    }),
    BullModule.registerQueue({ name: 'app-queue' }),
  ],
  providers: [QueueService, QueueProcessor, WelcomeEmailHandler],
  exports: [QueueService], // les autres modules importent juste QueueService
})
export class QueueModule {}
