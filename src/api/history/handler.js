class HistoryHandler {
    constructor(categoryService, historyService, validator) {
        this._categoryService = categoryService;
        this._historyService = historyService;
        this._validator = validator;

        this.postHistoryHandler = this.postHistoryHandler.bind(this);
        this.getHistoryHandler = this.getHistoryHandler.bind(this);
    }

    postHistoryHandler(request, h) {
        const { category_id } = request.params;
        const { user_id } = request.headers;
        const { total, details } = request.payload;
        const checkCategoryId = this._categoryService.getCategoryById(category_id, user_id);

        this._validator.validateHistoryPayload({ total, details });
        const historyId = this._historyService.addExpenses(user_id, category_id, { total, details });

        const response = h.response({
            status: 'success',
            message: 'History: success to add',
            data: {
                historyId
            }
        });

        response.code(201);
        return response;
    }

    getHistoryHandler(request, h) {
        const { user_id } = request.headers;
        const history = this._historyService.getExpenses(user_id);
        const response = h.response({
            status: 'success',
            data: {
                history
            }
        });
        
        response.code(200);
        return response;
    }

    // getHistoryByIdHandler(request, h) {
    //     const { user_id } = request.headers;
    //     const { id } = request.params;
    //     const history = (id.startsWith("C")) 
    //         ? this._historyService.getExpensesByCategory(user_id, id)
    //         : this._historyService.getHistoryById(user_id, id);

    //     const response = h.response({
    //         status: 'success',
    //         data: {
    //             history
    //         }
    //     });

    //     response.code(200);
    //     return response;
    // }
}

module.exports = HistoryHandler;