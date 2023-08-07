import Category, {
  CategoryProps,
} from '../../../../../domain/entities/Category';
import ICategoryRepository from '../../../../contracts/persistence/ICategoryRepository';
import TextUtils from '../../../../shared/utils/TextUtils';
import { CreateCategoryCommand } from './CreateCategoryCommand';
import { createCategoryCommandValidator } from './CreateCategoryCommandValidator';
import { CreateCategoryResponse } from './CreateCategoryResultResponse';

// TODO General handler base class
// TODO General command class
export class CreateCategoryCommandHandler {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async handle(
    request: CreateCategoryCommand
  ): Promise<CreateCategoryResponse | null> {
    await createCategoryCommandValidator.validateAsync(request);
    const categoryProps: CategoryProps =
      TextUtils.sanitizeObject<CategoryProps>(request);

    // create
    const newCategory = Category.create(categoryProps);
    // Save
    const savedCategoy = this.categoryRepository.CreateAsync(newCategory);

    // map to DTO

    // return

    const r: CreateCategoryResponse = {
      id: '123',
      name: 'name',
      description: 'descr',
    };
    return r;
  }

  // // validate
  // // sanitize

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
