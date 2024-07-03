// routes.js

const express = require('express');
const router = express.Router();
const authController = require('./Controllers/authController');
const usersController = require('./Controllers/usersController');
const { verifyToken } = require('./Middlewares/authMiddleware');


// Rota para listar todos os usuários
router.get('/users', verifyToken ,usersController.listAllUsers);

// Rota para registro de usuário
router.post('/register', verifyToken, authController.register);

// Rota para autenticação de usuário (login)
router.post('/login', authController.login);

// Exporta o router para ser usado no index.js
module.exports = router;
