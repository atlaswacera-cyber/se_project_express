const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }

  return helpers.error("string.uri");
};

const validateObjectId = (value, helpers) => {
  if (/^[a-fA-F0-9]{24}$/.test(value)) {
    return value;
  }

  return helpers.error("string.hex");
};

const userFields = {
  name: Joi.string().required().min(2).max(30).messages({
    "string.min": 'The minimum length of the "name" field is 2',
    "string.max": 'The maximum length of the "name" field is 30',
    "string.empty": 'The "name" field must be filled in',
    "any.required": 'The "name" field must be filled in',
  }),
  avatar: Joi.string().required().custom(validateURL).messages({
    "string.empty": 'The "avatar" field must be filled in',
    "string.uri": 'The "avatar" field must be a valid URL',
    "any.required": 'The "avatar" field must be filled in',
  }),
};

module.exports.validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    ...userFields,
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
      "any.required": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
      "any.required": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys(userFields),
});

module.exports.validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field must be filled in',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": 'The "weather" field must be hot, warm, or cold',
      "string.empty": 'The "weather" field must be filled in',
      "any.required": 'The "weather" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
      "any.required": 'The "imageUrl" field must be filled in',
    }),
  }),
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().custom(validateObjectId).messages({
      "string.hex": 'The "itemId" field must be a valid id',
      "any.required": 'The "itemId" field must be filled in',
    }),
  }),
});
