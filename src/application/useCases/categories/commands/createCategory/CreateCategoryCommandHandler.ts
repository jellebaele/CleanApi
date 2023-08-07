import Category, {
  CategoryProps,
} from '../../../../../domain/entities/Category';
import ICategoryRepository from '../../../../contracts/persistence/ICategoryRepository';
import TextUtils from '../../../../shared/utils/TextUtils';
import { CreateCategoryCommand } from './CreateCategoryCommand';
import { CreateCategoryResultDTO } from './CreateCategoryResultDTO';

// TODO General handler base class
// TODO General command class
export class CreateCategoryCommandHandler {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async handle(
    request: CreateCategoryCommand
  ): Promise<CreateCategoryResultDTO | null> {
    console.log(request);

    const r: CreateCategoryResultDTO = {
      id: '123',
      name: 'name',
      description: 'descr',
    };
    return r;
  }

  // // validate
  // // sanitize
  // const sanitizedRequest: CategoryProps = TextUtils.sanitizeObject(
  //   request
  // ) as CategoryProps;

  // // Create category
  // const n = Category.create(sanitizedRequest);

  // if (!n) throw new Error();

  // // Persist cagegory
  // const newCategory = await this.categoryRepository.CreateAsync(n);

  // // Map persistence -> DTO
  // const newCategoryDto: CreateCategoryResultDTO = {
  //   id: newCategory.id.toString(),
  //   name: newCategory.name,
  //   description: newCategory.description,
  // };

  // // Return new category
  // return newCategoryDto;
}
