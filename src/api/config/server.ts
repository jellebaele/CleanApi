import express, { Express } from 'express';
import { v1Router } from '../routes';
import { internalErrorHandler } from '../middleware/errorHandlerMiddleware';

export const setupServer = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(v1Router);

  app.use(internalErrorHandler);

  return app;
};
