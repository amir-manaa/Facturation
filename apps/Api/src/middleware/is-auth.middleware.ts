import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '../constants';
import * as utils from './../utils';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = utils.Security.getTokenFromRequest(req);

  if (token == null)
    return res
      .status(HTTP_RESPONSE_CODE.FORBIDDEN_403)
      .send(APP_ERROR_MESSAGE.accessDenied);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err)
      return res
        .status(HTTP_RESPONSE_CODE.FORBIDDEN_403)
        .send(APP_ERROR_MESSAGE.accessDenied);

    req['role'] = decodedToken.role;
    next();
  });
};
