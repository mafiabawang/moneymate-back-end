const { nanoid } = require('nanoid');

const { hashPassword, comparePassword } = require('../../utils/PasswordUtils');
const DBUtils = require('../../utils/DBUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

const tableNames = 'users';

class UsersService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async verifyUniqueValue(value, column, action) {
        const rows = await this._dbUtils.select([column], tableNames, `${column} = $1`, [value]);
        if (rows.length > 0) throw new InvariantError(`Gagal ${action} ${column}. ${column} sudah digunakan.`);
    }

    async verifyUserCredential(username, password) {
        const rows = await this._dbUtils.select(['id', 'password'], tableNames, 'username = $1', [username]);
        if (rows.length === 0) throw new AuthenticationError('Username yang Anda berikan salah');

        const { id, password: hashedPassword } = rows[0];
        const isMatching = await comparePassword(password, hashedPassword);
        if (!isMatching) throw new AuthenticationError('Password yang Anda berikan salah');

        return id;
    }

    async addUser({ username, password, role, mobile_phone }) {
        await this.verifyUniqueValue(username, 'username', 'menambahkan');

        const id = `U_${nanoid(14)}`;
        const profileId = `P_${nanoid(14)}`;
        const hashedPassword = await hashPassword(password);

        if (!(role >= 1 && role <= 2)) throw new InvariantError('Role tidak valid. Role harus diantara 1-2');

        const profileValues = [profileId, mobile_phone, id];
        await this._dbUtils.insert('u_profile', profileValues, ['id', 'phone', 'user_id']);

        const values = [id, username, hashedPassword, role];
        const rows = await this._dbUtils.insert(tableNames, values);

        if (!rows[0].id) throw new InvariantError('User gagal ditambahkan');

        return rows[0].id;
    }

    async getUsers() {
        return this._dbUtils.select(['id', 'username', 'role'], tableNames);
    }

    async getUserById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (rows.length === 0) throw new NotFoundError('User tidak ditemukan');

        return rows[0];
    }

    async editUserById(id, { username }) {
        const rows = await this._dbUtils.select(['username'], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui user. Id tidak ditemukan');

        if (username === rows[0].username) throw new InvariantError('Gagal memperbarui user. Tidak ada data yang diubah');

        if (username !== rows[0].username) await this.verifyUniqueValue(username, 'username', 'merubah');

        const columns = ['username'];
        const values = [username, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async editUserPasswordById(id, { old_pass, new_pass, confirm_pass }) {
        const rows = await this._dbUtils.select(['password'], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui password. Id tidak ditemukan');

        const isMatching = await comparePassword(old_pass, rows[0].password);
        if (!isMatching) throw new InvariantError('Password anda salah');

        if (old_pass === new_pass) throw new InvariantError('Password baru tidak boleh sama dengan password lama');

        if (new_pass !== confirm_pass) throw new InvariantError('Password baru dan konfirmasi password tidak sama');
        const hashedPassword = await hashPassword(new_pass);

        const columns = ['password'];
        const values = [hashedPassword, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deleteUserById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('User gagal dihapus. Id tidak ditemukan');
    }
};

module.exports = UsersService;