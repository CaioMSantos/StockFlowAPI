const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger'); // Importa as configurações do Swagger

require('dotenv').config();

const app = express();
const port = 4000;

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:4200', // Permite somente a origem do Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true // Caso esteja utilizando cookies ou autenticação
}));

// Configurações de middleware
app.use(express.json()); // Substitui o uso de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redireciona a raiz ("/") para o Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Rotas da aplicação
app.use('/', routes);

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
