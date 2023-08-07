import { Request, Response } from 'express';
import { createCategoryHandler } from '../../application/useCases/categories/commands/createCategory';

// Create BaseController
export class CategoryController {
  public async createCategory(req: Request, res: Response) {
    const response = await createCategoryHandler.handle({ ...req.body });

    return res.json(response);
  }
}
