export interface IDomainMapper<T> {
  toPresentation<U>(entity: T): U;
}
