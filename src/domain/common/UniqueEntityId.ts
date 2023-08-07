import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityId {
  public readonly _id: string | number;
  constructor(id?: string | number) {
    this._id = id ? id : uuidv4();
  }

  public toString(): string {
    return String(this._id);
  }
}
