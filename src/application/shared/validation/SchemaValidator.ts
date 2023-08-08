import { ObjectSchema } from 'joi';
import { ValidationError } from '../../error';

export class SchemaValidator {
  private schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }
  public async validateAsync(payload: any): Promise<void> {
    try {
      await this.schema.validateAsync(payload, { abortEarly: false });
    } catch (error: any) {
      throw new ValidationError(error);
    }
  }
}
