const Joi = require('joi');
     
const CategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
  percentage: Joi.number().integer().required()
});

module.exports = { CategoryPayloadSchema };