class CategoryHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postCategoryHandler = this.postCategoryHandler.bind(this);
        this.getCategoryHandler = this.getCategoryHandler.bind(this);
        this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);
        this.putCategoryByIdHandler = this.putCategoryByIdHandler.bind(this);
        this.deleteCategoryByIdHandler = this.deleteCategoryByIdHandler.bind(this);
    }

    postCategoryHandler(request, h) {
        const { user_id } = request.headers;
        const { name, percentage } = request.payload;
        this._validator.validateCategoryPayload({ name, percentage });
        const categoryId = this._service.addCategory(user_id, { name, percentage, type: "1" });

        const response = h.response({
            status: 'success',
            message: 'Category: success to add',
            data: {
                categoryId
            }
        });

        response.code(201);
        return response;
    }

    getCategoryHandler(request, h) {
        const { user_id } = request.headers;
        const category = this._service.getCategory(user_id);
        const response = h.response({
            status: 'success',
            data: {
                category
            }
        });
    
        response.code(200);
        return response;
    }

    getCategoryByIdHandler(request) {
        const { user_id } = request.headers;
        const { id } = request.params;
        const category = this._service.getCategoryById(id, user_id);
        return {
            status: 'success',
            data: {
                category
            }
        };
    }

    putCategoryByIdHandler(request) {
        const { id } = request.params;
        const { user_id } = request.headers;
        const { name, percentage } = request.payload;
        this._validator.validateCategoryPayload({ name, percentage });
        this._service.editCategoryById(id, user_id, { name, percentage, type:"1" });

        return {
            status: 'success',
            message: 'Category: success to update'
        };
        
    }
    
    deleteCategoryByIdHandler(request) {  
        const { id } = request.params;
        const { user_id } = request.headers;
        this._service.deleteCategoryById(id, user_id);
        
        return {
            status: 'success',
            message: 'Category: success to delete'
        };
    }
}

module.exports = CategoryHandler;