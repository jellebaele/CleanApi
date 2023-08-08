import Category, {
  CategoryProps,
} from '../../../../../domain/entities/Category';
import ICategoryRepository from '../../../../contracts/persistence/ICategoryRepository';
import { CategoryMapper } from '../../../../mappers/category/CategoryMapper';
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

    const newCategory = Category.create(categoryProps);
    const savedCategoy = await this.categoryRepository.CreateAsync(newCategory);

    const result =
      CategoryMapper.toPresentation<CreateCategoryResponse>(savedCategoy);

    return result;
  }
}
