import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)  
    return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err)
      return res.status(403).send("Could not verify token");

    console.log('jwt.authData jwt.authData jwt.authData', authData.role)

    req['role'] = authData.role;
    
    next();
  })
}