import { Request, Response } from 'express';
import { createCategoryHandler } from '../../../application/useCases/categories/commands/createCategory';
import { BaseController } from '../BaseController';
import { CreateCategoryResponse } from '../../../application/useCases/categories/commands/createCategory/CreateCategoryResultResponse';

export class CategoryController extends BaseController {
  public async createCategory(req: Request, res: Response) {
    const newCategory: CreateCategoryResponse | null =
      await createCategoryHandler.handle({ ...req.body });

    return this.created(res, newCategory);
  }
}
