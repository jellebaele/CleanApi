import Category from '../../../domain/entities/Category';
import IAsyncRepository from './IAsyncRepository';

type ICategoryRepository = IAsyncRepository<Category>;

export default ICategoryRepository;
