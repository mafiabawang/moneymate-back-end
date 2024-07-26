const DBUtils = require('../../utils/DBUtils');
const InvariantError = require('../../exceptions/InvariantError');

const tableNames = 'authentification';

class AuthenticationsService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async addRefreshToken(token) {
        await this._dbUtils.insert(tableNames, token);
    }

    async verifyRefreshToken(token) {
        const rows = await this._dbUtils.select(['token'], tableNames, 'token = $1', [token]);
        if (rows.length === 0) throw new InvariantError('Refresh token tidak valid');

        return rows[0];
    }

    async deleteRefreshToken(token) {
        await this._dbUtils.delete(tableNames, 'token = $1', [token]);
    }
};

module.exports = AuthenticationsService;