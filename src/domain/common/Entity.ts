import { v4 as uuidv4 } from 'uuid';
import { UniqueEntityId } from './UniqueEntityId';

abstract class Entity<T> {
  protected readonly uniqueEntityId: UniqueEntityId;
  public readonly props: T;
  // DateCreated
  // ...

  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this.uniqueEntityId = id ? id : new UniqueEntityId(uuidv4());
  }

  public get _id(): string | number {
    return this.uniqueEntityId._id;
  }
}

export default Entity;
