const express = require('express');
const router = express.Router();
const authController = require('./Controllers/authController');
const usersController = require('./Controllers/usersController');
const suppliersController = require('./Controllers/suppliersController')
const { verifyToken } = require('./Middlewares/authMiddleware');

// Rota para autenticação de usuário (login)
router.post('/auth/login', authController.login);

//USUARIOS
// Rota para listar todos os usuários
router.get('/users/listAll', verifyToken ,usersController.listAllUsers);
// Rota para registro de usuário
router.post('/users/add', verifyToken, usersController.addUser);
// Rota para atualizar as informações do Usuário
router.post('/users/update', verifyToken, usersController.updateUser)
// Rota para deletar um usuário
router.delete('/users/delete/:userId', verifyToken, usersController.deleteUser);

//FORNECEDORES
// Rota para criar um novo fornecedor
router.post('/suppliers/create', verifyToken, suppliersController.addSuppliers);
// Rota para listar todos os fornecedores
router.get('/suppliers/listAll', verifyToken, suppliersController.listAllSuppliers)
// Rota para atualizar os dados de um Fornecedor
router.put('/suppliers/update', verifyToken, suppliersController.updateSupplier)
// Rota para excluir um fornecedor
router.delete('/suppliers/delete/:supplierId', verifyToken, suppliersController.deleteSupplier)

// Exporta o router para ser usado no index.js
module.exports = router;
