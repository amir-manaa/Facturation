import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const isAuthenticateToken = (req: Request, res: Response, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)  
    return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err)
      return res.status(403).send("Could not verify token");

    req['user'] = authData;
    next();
  })
}