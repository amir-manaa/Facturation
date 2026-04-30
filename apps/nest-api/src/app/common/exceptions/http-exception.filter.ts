import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerDevService } from '../services/logger-dev.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(private readonly loggerDevService: LoggerDevService) {
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let httpResponse: any;
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      // getResponse() peut être string ou { message: string | string[] }
      if (typeof res === 'string') {
        httpResponse = res;
      } else if (typeof res === 'object' && res['message']) {
        httpResponse = res['message'];
      } else {
        httpResponse = 'Unknown error';
      }
    } else {
      httpResponse = 'Internal server error';
    }

    // Log uniquement les erreurs serveur 500+
    // if (httpStatus >= 500) {
    this.loggerDevService.error(`
        HTTP Status: [ ${httpStatus} ]
        Error: [ ${JSON.stringify(httpResponse)} ]`);

    response.status(httpStatus).json({
      success: false,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: httpResponse,
    });
  }
}
