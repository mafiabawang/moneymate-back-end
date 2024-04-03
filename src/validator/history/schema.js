const Joi = require('joi');
     
const HistoryPayloadSchema = Joi.object({
  total: Joi.number().integer().required(),
  details: Joi.string().required(),
});

module.exports = { HistoryPayloadSchema };