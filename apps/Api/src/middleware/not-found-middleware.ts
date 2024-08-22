import { Request, Response } from "express";
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '../constants';

export const get404Middleware = (req: Request, res: Response): void => {
  res.status(HTTP_RESPONSE_CODE.NOT_FOUND_404).send(APP_ERROR_MESSAGE.pageNotFound);
}