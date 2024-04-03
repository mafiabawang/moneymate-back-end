const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

const category = require('./api/category');
const CategoryService = require('./services/inMemory/CategoryService');
const CategoryValidator = require('./validator/category');

const history = require('./api/history');
const HistoryService = require('./services/inMemory/HistoryService');
const HistoryValidator = require('./validator/history');

const init = async () => {
  const categoryService = new CategoryService();
  const historyService = new HistoryService();
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*']
        }
    }
  });
 
  await server.register([ 
    {
      plugin: category,
      options: {
        service: categoryService,
        validator: CategoryValidator
      }
    },
    {
      plugin: history,
      options: {
        categoryService,
        historyService,
        validator: HistoryValidator
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
  
    // penanganan client error secara internal.
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
      
    return h.continue;
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();