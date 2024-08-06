import { NextFunction, Request, Response } from "express";
import { HttpException } from '../exceptions/exception';
import { HttpStatusCode } from '@interfaces/';

export const errorHandlerMiddleware = (error: HttpException, resuest: Request, response: Response, next: NextFunction) => {
  const status = error.status ?? 500;
  const message = status === HttpStatusCode.INTERNAL_SERVER_ERROR_500 ? 'Something went wrong, try again later' : error.message;
  const errors = error.error;
  response.status(status).send({ status, message, error: errors });
}