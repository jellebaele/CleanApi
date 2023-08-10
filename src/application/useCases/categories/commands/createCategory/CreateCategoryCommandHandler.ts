import Category, {
  CategoryProps,
} from '../../../../../domain/entities/Category';
import ICategoryRepository from '../../../../contracts/persistence/ICategoryRepository';
import { CategoryMapper } from '../../../../mappers';
import { ICommandHandler } from '../../../../shared/models/ICommandHandler';
import TextUtils from '../../../../shared/utils/TextUtils';
import { CreateCategoryCommand } from './CreateCategoryCommand';
import { createCategoryCommandValidator } from './CreateCategoryCommandValidator';
import { CreateCategoryResponse } from './CreateCategoryResultResponse';

export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand, CreateCategoryResponse>
{
  private categoryRepository: ICategoryRepository;
  private readonly _mapper: CategoryMapper;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
    this._mapper = new CategoryMapper();
  }

  async handle(
    command: CreateCategoryCommand
  ): Promise<CreateCategoryResponse | null> {
    await createCategoryCommandValidator.validateAsync(command);

    const categoryProps: CategoryProps =
      TextUtils.sanitizeObject<CategoryProps>(command);

    const newCategory = Category.create(categoryProps);
    const savedCategoy = await this.categoryRepository.CreateAsync(newCategory);

    const result =
      this._mapper.toPresentation<CreateCategoryResponse>(savedCategoy);

    return result;
  }
}
