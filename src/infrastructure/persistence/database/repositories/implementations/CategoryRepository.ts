import ICategoryRepository from '../../../../../application/contracts/persistence/ICategoryRepository';
import Category from '../../../../../domain/entities/Category';
import { CategoryDocument } from '../../models';
import { BaseRepository } from '../BaseRepository';

export default class CategoryRepository
  extends BaseRepository<Category, CategoryDocument>
  implements ICategoryRepository {}
