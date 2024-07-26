const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class HistoryService {
    constructor() {
        this._history = [];
    }

    validationUser(user_id) {
        if (!user_id) {
            throw new NotFoundError('Unauthorized: user_id is missing');
        }

        return true;
    }

    addExpenses(user_id, { total, details, category_id }) {
        const id = 'H_' + nanoid(14);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        
        const newHistory = {
            user_id, category_id, total, details, id, createdAt, updatedAt
        };
        this._history.push(newHistory);

        const isSuccess = this._history.filter((h) => h.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('History: failed to add');
        }

        return id;
    }

    getExpenses(user_id) {
        const result =  this._history.filter((h) => h.user_id == user_id);
        if (result.length === 0) {
            throw new NotFoundError('History: user_id doesn\'t have');
        }

        return result;
    }

    // getExpensesByCategory(user_id, id){
    //     if (!user_id) {
    //         throw new NotFoundError('Unauthorized: user_id is missing');
    //     }

    //     const result = this._history.find((h) => h.category_id === id);

    //     if (!result) {
    //         throw new NotFoundError('History: not found');
    //     }

    //     if (result.user_id !== user_id) {
    //         throw new NotFoundError('History: not found, it\'s not yours');
    //     }

    //     return result;
    // }

    // getHistoryById(user_id, id) {
    //     if (!user_id) {
    //         throw new NotFoundError('Unauthorized: user_id is missing');
    //     }

    //     const result = this._history.find((h) => h.id === id)[0];

    //     if (!result) {
    //         throw new NotFoundError('History: not found');
    //     }

    //     if (result.user_id !== user_id) {
    //         throw new NotFoundError('History: not found, it\'s not yours');
    //     }

    //     return result;
    // }
}

module.exports = HistoryService;