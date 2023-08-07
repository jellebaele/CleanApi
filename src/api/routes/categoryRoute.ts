import { Request, Response, Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', (req: Request, res: Response) => {
  categoryController.createCategory(req, res);
});

export { categoryRouter };
