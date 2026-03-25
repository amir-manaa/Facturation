import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerDevService {
  private readonly logger: Logger = new Logger(LoggerDevService.name);
  private readonly isDev: boolean =
    this.configService.get<string>('APP_ENV') === 'development';

  constructor(private configService: ConfigService) {}

  log(message: string): void {
    if (this.isDev) this.logger.debug(message);
  }

  debug(message: string): void {
    if (this.isDev) this.logger.debug(message);
  }

  warn(message: string): void {
    if (this.isDev) this.logger.warn(message);
  }

  error(message: string): void {
    if (this.isDev) this.logger.error(message);
  }
}

