import { NextFunction, Request, Response } from "express";
import { HttpException } from '../exceptions/exception';
import { HttpStatusCode } from "@constants"; 

export const errorHandlerMiddleware = (error, resuest: Request, response: Response, next: NextFunction) => {
  const status = error.statusCode ?? 500;
  const message = status === HttpStatusCode.NOT_FOUND_404 ? 'Something went wrong, try again later' : error.message;
  const errors = error.error;
  response.status(status).json({ status, message, error: errors });
}