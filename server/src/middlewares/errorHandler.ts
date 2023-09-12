import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  console.log(res);
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
}
