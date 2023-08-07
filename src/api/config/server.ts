import express, { Express } from 'express';
import { v1Router } from '../routes';

export const setupServer = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(v1Router);

  return app;
};
