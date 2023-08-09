import Category, {
  CategoryProps,
} from '../../../../../domain/entities/Category';
import ICategoryRepository from '../../../../contracts/persistence/ICategoryRepository';
import { CategoryMapper } from '../../../../mappers';
import TextUtils from '../../../../shared/utils/TextUtils';
import { CreateCategoryCommand } from './CreateCategoryCommand';
import { createCategoryCommandValidator } from './CreateCategoryCommandValidator';
import { CreateCategoryResponse } from './CreateCategoryResultResponse';

// TODO General handler base class
// TODO General command class
export class CreateCategoryCommandHandler {
  private categoryRepository: ICategoryRepository;
  private readonly _mapper: CategoryMapper;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
    this._mapper = new CategoryMapper();
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
      this._mapper.toPresentation<CreateCategoryResponse>(savedCategoy);

    return result;
  }
}
