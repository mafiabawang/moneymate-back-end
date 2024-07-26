const autoBind = require('auto-bind');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postUserHandler(request, h) {
        this._validator.validateUserCreatePayload(request.payload);
        const { username, password, mobile_phone } = request.payload;
        const userId = await this._service.addUser({ username, password, role: 1, mobile_phone });

        return h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId,
            },
        }).code(201);
    }

    async getUsersHandler() {
        const users = await this._service.getUsers();
        return {
            status: 'success',
            data: {
                users,
            },
        };
    }

    async getUserByIdHandler(request) {
        const { id } = request.params;
        const user = await this._service.getUserById(id);
        return {
            status: 'success',
            data: {
                user,
            },
        };
    }

    async putUserByIdHandler(request) {
        this._validator.validateUserUpdatePayload(request.payload);
        const { username } = request.payload;
        const { id } = request.params;
        await this._service.editUserById(id, { username });

        return {
            status: 'success',
            message: 'User berhasil diperbarui',
        };
    }

    async putUserPasswordByIdHandler(request) {
        this._validator.validatePasswordUpdatePayload(request.payload);
        const { old_pass, new_pass, confirm_pass } = request.payload;
        const { id } = request.params;
        await this._service.editUserPasswordById(id, { old_pass, new_pass, confirm_pass });

        return {
            status: 'success',
            message: 'Password berhasil diperbarui',
        };
    }

    async deleteUserByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteUserById(id);

        return {
            status: 'success',
            message: 'User berhasil dihapus',
        };
    }
};

module.exports = UsersHandler;