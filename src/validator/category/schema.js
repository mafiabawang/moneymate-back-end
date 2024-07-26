const Joi = require('joi');

const AddCategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
  percentage: Joi.number().integer().required(),
  color: Joi.string().required()
});

module.exports = { CategoryPayloadSchema };