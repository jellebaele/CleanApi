import Entity from '../common/Entity';
import { UniqueEntityId } from '../common/UniqueEntityId';

// interface Category extends Entity {
//   name: string;
//   description: string;
// }

export interface CategoryProps {
  name: string;
  description: string;
}

class Category extends Entity<CategoryProps> {
  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public static create(props: CategoryProps, id?: UniqueEntityId): Category {
    const category = new Category(props, id);
    return category;
  }
}

export default Category;
