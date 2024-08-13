import { Request, Response } from "express";

export const get404Middleware = (req: Request, res: Response): void => {
  res.status(404).send('Page Not Found');
}