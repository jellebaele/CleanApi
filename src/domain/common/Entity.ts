import { v4 as uuidv4 } from 'uuid';
import { UniqueEntityId } from './UniqueEntityId';

abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  public readonly props: T;
  // DateCreated
  // ...

  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ? id : new UniqueEntityId(uuidv4());
  }

  public get id(): UniqueEntityId {
    return this._id;
  }
}

export default Entity;
