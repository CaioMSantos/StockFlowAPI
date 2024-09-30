const express = require('express');
const router = express.Router();
const authController = require('./Controllers/authController');
const usersController = require('./Controllers/usersController');
const suppliersController = require('./Controllers/suppliersController');
const { verifyToken } = require('./Middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Rotas de autenticação de usuário
 *   - name: Usuários
 *     description: Rotas para gerenciamento de usuários
 *   - name: Fornecedores
 *     description: Rotas para gerenciamento de fornecedores
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/auth/login', authController.login);

// USUÁRIOS

/**
 * @swagger
 * /users/listAll:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Não autorizado
 */
router.get('/users/listAll', verifyToken, usersController.listAllUsers);

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Adiciona um novo usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Usuário"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/users/add', verifyToken, usersController.addUser);

/**
 * @swagger
 * /users/update:
 *   post:
 *     summary: Atualiza as informações de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: "Usuário Atualizado"
 *               email:
 *                 type: string
 *                 example: "usuario_atualizado@example.com"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/users/update', verifyToken, usersController.updateUser);

/**
 * @swagger
 * /users/delete/{userId}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/users/delete/:userId', verifyToken, usersController.deleteUser);

// FORNECEDORES

/**
 * @swagger
 * /suppliers/create:
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fornecedor XYZ"
 *               endereco:
 *                 type: string
 *                 example: "Rua A, 123"
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/suppliers/create', verifyToken, suppliersController.addSuppliers);

/**
 * @swagger
 * /suppliers/listAll:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Não autorizado
 */
router.get('/suppliers/listAll', verifyToken, suppliersController.listAllSuppliers);

/**
 * @swagger
 * /suppliers/update:
 *   put:
 *     summary: Atualiza os dados de um fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: "Fornecedor Atualizado"
 *               endereco:
 *                 type: string
 *                 example: "Rua B, 456"
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put('/suppliers/update', verifyToken, suppliersController.updateSupplier);

/**
 * @swagger
 * /suppliers/delete/{supplierId}:
 *   delete:
 *     summary: Exclui um fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor a ser excluído
 *     responses:
 *       200:
 *         description: Fornecedor excluído com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 */
router.delete('/suppliers/delete/:supplierId', verifyToken, suppliersController.deleteSupplier);

// Exporta o router para ser usado no index.js
module.exports = router;
