import { NextFunction, Request, RequestHandler, Response } from 'express';
import { NotFoundError, ValidationError } from '../../application/error';

export const internalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (!err.status) console.log(err.stack);

  let statusCode = 500;
  switch (err.constructor) {
    case ValidationError:
      statusCode = 400;
      break;
    case NotFoundError:
      statusCode = 404;
      break;
  }

  res
    .status(statusCode)
    .json({ message: err.message || 'Internal server error' });
};

export const asyncErrorHandler =
  (handler: RequestHandler) =>
  (...args: [Request, Response, NextFunction]) => {
    const next: NextFunction = args[2];

    return Promise.resolve(handler(...args)).catch(next);
  };
