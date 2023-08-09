import { Model } from 'mongoose';
import IAsyncRepository from '../../../../application/contracts/persistence/IAsyncRepository';
import { IPersistenceMapper } from '../mappers/IPersistenceMapper';

export abstract class BaseRepository<T, U extends Document, V>
  implements IAsyncRepository<T>
{
  protected readonly _model: Model<U>;
  protected readonly _persistanceMapper: IPersistenceMapper<T, V>;

  constructor(model: Model<U>, mapper: IPersistenceMapper<T, V>) {
    this._model = model;
    this._persistanceMapper = mapper;
  }

  async GetByIdAsync(id: string): Promise<T> {
    return (await this._model.findById({ _id: id })) as T;
  }

  async CreateAsync(entity: T): Promise<T> {
    const rawEntity = this._persistanceMapper.toPersistance(entity);

    const newDocument = await new this._model({
      ...rawEntity,
    }).save();

    return this._persistanceMapper.toDomain(newDocument as any);
  }
}
