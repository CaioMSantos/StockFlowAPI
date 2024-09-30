// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definição das opções do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StockFlow API',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Altere conforme sua necessidade
      },
    ],
  },
  apis: ['./routes.js'], // Aponta para o arquivo onde estão as rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
