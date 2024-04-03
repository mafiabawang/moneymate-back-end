const HistoryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'History',
    version: '1.0.0',
    register: async (server, { categoryService, historyService, validator }) => {
        const historyHandler = new HistoryHandler(categoryService, historyService, validator);
        server.route(routes(historyHandler));
    }
};