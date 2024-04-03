const { CategoryPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');
     
const CategoryValidator = {
  validateCategoryPayload: (payload) => {
    const validationResult = CategoryPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CategoryValidator;