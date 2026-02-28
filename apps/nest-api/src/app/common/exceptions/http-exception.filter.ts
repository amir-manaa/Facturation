import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
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
      Logger.error(
        `
        HTTP Status: [ ${httpStatus} ]
        Error: [ ${JSON.stringify(httpResponse)} ]`
      );
    // }

    // const status = exception.getStatus(); / for exception: HttpException

    response.status(httpStatus).json({
      success: false,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: httpResponse,
    });
  }

  //@Catch(HttpException)
  //looking for exceptions of type HttpException and nothing else.

  //we can apply filter exception

  //on controller :
  // @Controller()
  // @UseFilters(new HttpExceptionFilter())

  //on methode
  //@Post()
  //@UseFilters(HttpExceptionFilter)

  //global on maint.ts
  //app.useGlobalFilters(new HttpExceptionFilter());

  //on module
  /*
  roviders: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
   */








  /*@Catch()
  export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }*/

}
