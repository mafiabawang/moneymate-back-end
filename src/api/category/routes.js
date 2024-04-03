const routes = (handler) => [
    {
      method: 'POST',
      path: '/category',
      handler: handler.postCategoryHandler
    },
    {
      method: 'GET',
      path: '/category',
      handler: handler.getCategoryHandler
    },
    {
      method: 'GET',
      path: '/category/{id}',
      handler: handler.getCategoryByIdHandler
    },
    {
      method: 'PUT',
      path: '/category/{id}',
      handler: handler.putCategoryByIdHandler
    },
    {
      method: 'DELETE',
      path: '/category/{id}',
      handler: handler.deleteCategoryByIdHandler
    }
  ];
  
  module.exports = routes;