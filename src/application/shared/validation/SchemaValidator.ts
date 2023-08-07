import { ObjectSchema } from 'joi';

export class SchemaValidator {
  private schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }
  public async validateAsync(payload: unknown): Promise<void> {
    try {
      await this.schema.validateAsync(payload, { abortEarly: false });
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  }
}
