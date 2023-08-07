import Joi from 'joi';

const name = Joi.string().min(3).max(128).trim().required();
const description = Joi.string().optional().min(0).max(256);

export { name, description };
