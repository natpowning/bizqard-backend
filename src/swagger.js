const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'test bizqard-backend API',
      version: '1.0.0',
      description: 'API documentation for bizqard-backend',
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
};