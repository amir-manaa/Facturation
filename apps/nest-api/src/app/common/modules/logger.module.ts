import { Global, Module } from '@nestjs/common';
import { LoggerDevService } from '@api/common/services/logger-dev.service';

@Global()
@Module({
  providers: [LoggerDevService],
  exports: [LoggerDevService],
})
export class LoggerModule {}
