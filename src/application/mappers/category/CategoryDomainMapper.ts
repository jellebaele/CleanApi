import Category from '../../../domain/entities/Category';
import { IDomainMapper } from '../IDomainMapper';

export class CategoryMapper implements IDomainMapper<Category> {
  toPresentation<U>(category: Category): U {
    return {
      id: category._id,
      name: category.name,
      description: category.description,
    } as U;
  }
}
