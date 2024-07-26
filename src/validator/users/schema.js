const Joi = require('joi');

const UserCreatePayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    mobile_phone: Joi.string().required()
});


const UserUpdatePayloadSchema = Joi.object({
    username: Joi.string().required()
});

const PasswordUpdatePayloadSchema = Joi.object({
    old_pass: Joi.string().required(),
    new_pass: Joi.string().required(),
    confirm_pass: Joi.string().required()
});

module.exports = { UserCreatePayloadSchema, UserUpdatePayloadSchema, PasswordUpdatePayloadSchema };