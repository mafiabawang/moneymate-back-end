const routes = (handler) => [
    {
        method: 'POST',
        path: '/plans',
        handler: handler.postPlanHandler
    },
    {
        method: 'GET',
        path: '/plans/{id}',
        handler: handler.getPlanByIdHandler
    },
    {
        method: 'PUT',
        path: '/plans/{id}',
        handler: handler.putPlanByIdHandler
    },
    {
        method: 'DELETE',
        path: '/plans/{id}',
        handler: handler.deletePlanByIdHandler
    }
];

module.exports = routes;