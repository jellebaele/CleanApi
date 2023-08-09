import ICategoryRepository from '../../../../../application/contracts/persistence/ICategoryRepository';
import Category from '../../../../../domain/entities/Category';
import { CategoryDTO, CategoryDocument } from '../../models';
import { BaseRepository } from '../BaseRepository';

export default class CategoryRepository
  extends BaseRepository<Category, CategoryDocument, CategoryDTO>
  implements ICategoryRepository {}
