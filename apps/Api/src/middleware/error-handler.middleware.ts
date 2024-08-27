import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, APP_ERROR_MESSAGE } from "../constants"; 

export const errorHandlerMiddleware = (error, request: Request, response: Response, next: NextFunction) => {
  const status = error.statusCode ?? 500;
  const message = status === HttpStatusCode.NOT_FOUND_404 ? APP_ERROR_MESSAGE.serverError_500 : error.message;
  const errors = error.error;
  response.status(status).json({ status, message, error: errors });
}