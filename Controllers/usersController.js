const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');

const listAllUsers = async (req, res) => {
    try {
        const users = await userModel.listAllUsers();
        res.status(200).send(users);  // Retorna a lista de usuários
    } catch (err) {
        console.error('Error fetching users', err);
        res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = {
    listAllUsers
};
