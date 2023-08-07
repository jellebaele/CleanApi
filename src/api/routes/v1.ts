import { Router } from 'express';
import { categoryRouter } from './categoryRoute';

const v1Router: Router = Router();

v1Router.use('/category', categoryRouter);

export { v1Router };
