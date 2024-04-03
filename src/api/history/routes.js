const routes = (handler) => [
    {
      method: 'POST',
      path: '/history/{category_id}',
      handler: handler.postHistoryHandler
    },
    {
      method: 'GET',
      path: '/history',
      handler: handler.getHistoryHandler
    },
  ];
  
  module.exports = routes;