const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
