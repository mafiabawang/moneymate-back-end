const { HistoryPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');
     
const HistoryValidator = {
  validateHistoryPayload: (payload) => {
    const validationResult = HistoryPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = HistoryValidator;