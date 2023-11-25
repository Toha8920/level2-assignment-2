import Joi from 'joi';

const userJoiSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'userId is required',
    'number.base': 'userId must be a number',
  }),
  username: Joi.string().required().messages({
    'any.required': 'userName is required',
    'string.base': 'userName must be a string',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
    'string.base': 'password must be a string',
  }),
  fullName: Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'firstName is required',
      'string.base': 'firstName must be a string',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'lastName is required',
      'string.base': 'lastName must be a string',
    }),
  }),
  age: Joi.number().required().messages({
    'any.required': 'age is required',
    'number.base': 'age must be a number',
  }),
  email: Joi.string().required().messages({
    'any.required': 'email is required',
    'string.base': 'email must be a string',
  }),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: Joi.object({
    street: Joi.string().required().messages({
      'any.required': 'street is required',
      'string.base': 'street must be a string',
    }),
    city: Joi.string().required().messages({
      'any.required': 'city is required',
      'string.base': 'city must be a string',
    }),
    country: Joi.string().required().messages({
      'any.required': 'country is required',
      'string.base': 'country must be a string',
    }),
  }),
  orders: Joi.array().items(
    Joi.object({
      productName: Joi.string(),
      price: Joi.number(),
      quantity: Joi.number(),
    }),
  ),
});
export default userJoiSchema;
