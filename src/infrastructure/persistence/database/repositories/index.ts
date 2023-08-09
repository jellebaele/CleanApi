import { PersistenceCategoryMapper } from '../mappers/implementations/PersistenceCategoryMapper';
import { CategoryModel } from '../models';
import CategoryRepository from './implementations/CategoryRepository';

export const categoryRepository = new CategoryRepository(
  CategoryModel,
  new PersistenceCategoryMapper()
);
