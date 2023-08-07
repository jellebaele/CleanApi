import Category from '../../../domain/entities/Category';

export class CategoryMapper {
  public static toPersistence(category: Category): any {
    return {
      name: category.name,
    };
  }
}
