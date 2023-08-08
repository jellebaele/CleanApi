import { Request, Response, Router } from 'express';
import { CategoryController } from '../controllers/implementations/CategoryController';
import { asyncErrorHandler } from '../middleware/errorHandlerMiddleware';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
  '/',
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.createCategory(req, res);
  })
);

export { categoryRouter };
