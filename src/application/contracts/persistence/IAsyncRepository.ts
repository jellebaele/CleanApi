interface IAsyncRepository<T> {
  GetByIdAsync(id: string): Promise<T>;
  CreateAsync(entity: T): Promise<T>;
}

export default IAsyncRepository;
