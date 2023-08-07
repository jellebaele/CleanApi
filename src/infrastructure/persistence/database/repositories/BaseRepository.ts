import { Model } from 'mongoose';
import IAsyncRepository from '../../../../application/contracts/persistence/IAsyncRepository';

export abstract class BaseRepository<T, U extends Document>
  implements IAsyncRepository<T>
{
  private readonly _model: Model<U>;

  constructor(model: Model<U>) {
    this._model = model;
  }

  async GetByIdAsync(id: string): Promise<T> {
    return (await this._model.findById({ _id: id })) as T;
  }
  async CreateAsync(entity: T): Promise<T> {
    // Use mappers!
    //  -> toPersistence
    //  -> toDomain
    return (await new this._model({ ...entity }).save()) as T;
  }
}
