import { UniqueEntityId } from '../../../../../domain/common/UniqueEntityId';
import Category from '../../../../../domain/entities/Category';
import { CategoryDTO } from '../../models';
import { IPersistenceMapper } from '../IPersistenceMapper';

export class PersistenceCategoryMapper
  implements IPersistenceMapper<Category, CategoryDTO>
{
  toDomain(raw: CategoryDTO): Category {
    return Category.create(
      { name: raw.name, description: raw.description },
      new UniqueEntityId(raw._id)
    );
  }
  toPersistance(entity: Category): CategoryDTO {
    return {
      _id: entity._id.toString(),
      name: entity.name,
      description: entity.description,
    };
  }
}
