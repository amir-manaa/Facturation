import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
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

    const httpResponse =
      exception instanceof HttpException
        ? exception.message
        : 'Bad Request';

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
