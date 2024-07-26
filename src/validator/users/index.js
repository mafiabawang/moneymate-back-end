const { UserCreatePayloadSchema, UserUpdatePayloadSchema, PasswordUpdatePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
    validateUserCreatePayload: (payload) => {
        const validationResult = UserCreatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateUserUpdatePayload: (payload) => {
        const validationResult = UserUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validatePasswordUpdatePayload: (payload) => {
        const validationResult = PasswordUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    }
};

module.exports = UsersValidator;