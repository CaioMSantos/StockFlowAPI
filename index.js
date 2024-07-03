const express = require('express');
const bodyParser = require('body-parser');
const { validateLoginRequest } = require('./Middlewares/authMiddleware');
const { login, register  } = require('./Controllers/authController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/login', validateLoginRequest, login);
app.post('/register', validateLoginRequest, register);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
