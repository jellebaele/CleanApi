import { categoryRepository } from '../../../../../infrastructure/persistence/database/repositories';
import { CreateCategoryCommandHandler } from './CreateCategoryCommandHandler';

export const createCategoryHandler = new CreateCategoryCommandHandler(
  categoryRepository
);
