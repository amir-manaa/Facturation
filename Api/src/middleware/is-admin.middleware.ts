import * as express from "express";
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '@constants';
import { Role } from "@enums";

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const role = req["role"];
  if (role === Role.user)
    return res.status(HTTP_RESPONSE_CODE.FORBIDDEN_403).send(APP_ERROR_MESSAGE.accessDenied);

  return next();
}