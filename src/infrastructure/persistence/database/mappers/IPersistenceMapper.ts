export interface IPersistenceMapper<T, U> {
  toDomain(raw: U): T;
  toPersistance(entity: T): U;
}
