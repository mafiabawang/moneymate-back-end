const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CategoryService {
    constructor() {
        this._category = [];
    }
    
    validationUser(user_id) {
        if (!user_id) {
            throw new NotFoundError('Unauthorized: user_id is missing');
        }

        return true;
    }

    getTotalPercentage(user_id, percentage, id = null, type = "1") {
        let currentTotal = this._category.filter(ctg => ctg.user_id === user_id).reduce((result, ctg_p) => result + ctg_p.percentage, 0);
        
        if (type) {
            currentTotal = this._category.filter(ctg => ctg.user_id === user_id);
        }

        currentTotal = (id) ? currentTotal - this._category.find(ctg => ctg.id === id).percentage : currentTotal;
        
        if (currentTotal + percentage > 100) {
            throw new InvariantError('Category: Limit Percentage');
        }

        return true;
    }

    addCategory(user_id, { name, percentage, type }) {
        const id = 'C_' + nanoid(14);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        
        const newCategory = {
            name, percentage, type, id, user_id, createdAt, updatedAt
        };
        this._category.push(newCategory);

        const isSuccess = this._category.filter((ctg) => ctg.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Category: failed to add');
        }

        return id;
    }

    getCategory(user_id, type = null) {
        let categories = [...this._category];

        if (type) {
            categories = categories.filter(ct => ct.type === type);
        }

        const result = categories.filter(ct => ct.user_id === user_id);
        if (result.length === 0) {
            throw new NotFoundError('Category: user_id doesn\'t have');
        }

        return result;
    }

    getCategoryById(id, user_id) {
        const category = this._category.filter((ctg) => ctg.id === id)[0];
        if (!category) {
            throw new NotFoundError('Category: not found, CategoryId not found');
        }

        if (category.user_id !== user_id) {
            throw new NotFoundError('Category: not found, it\'s not yours');
        }
        
        return category;
    }

    editCategoryById(id, user_id, { name, percentage, type }) {
        const updatedAt = new Date().toISOString(); 
        const index = this._category.findIndex((ctg) => ctg.id === id);
        if (index === -1) {
            throw new NotFoundError('Category: failed to update, id not found');
        }
        if (this._category[index].user_id !== user_id) {
            throw new NotFoundError('Category: failed to delete, it\'s not yours');
        }

        this._category[index] = {
            ...this._category[index],
            name,
            percentage,
            type,
            user_id,
            updatedAt
        };
    }

    deleteCategoryById(id, user_id) {
        const index = this._category.findIndex((ctg) => ctg.id === id);
        if (index === -1) {
            throw new NotFoundError('Category: failed to delete, id not found');
        }

        if (this._category[index].user_id !== user_id) {
            throw new NotFoundError('Category: failed to delete, it\'s not yours');
        }

        this._category.splice(index, 1);
    }
}

module.exports = CategoryService;