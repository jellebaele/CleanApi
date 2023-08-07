import Joi from 'joi';
import { SchemaValidator } from '../../../../shared/validation/SchemaValidator';
import { name, description } from '../../validation/CategoryValidation';

const createCategoryValidationSchema = Joi.object({
  name,
  description,
});

export const createCategoryCommandValidator = new SchemaValidator(
  createCategoryValidationSchema
);
