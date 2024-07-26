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

const addUser = async (req, res) => {
    const { username, password, email, userType, name, address, city, state, zip_code, country } = req.body;

    try {
        await userModel.addUser(username, password, email, userType, name, address, city, state, zip_code, country);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering the User', err);
        res.status(500).send({ message: 'Error registering the User' });
    }
};

const updateUser = async (req, res) => {
    const { userId, username, password, email, userType, name, address, city, state, zip_code, country } = req.body;

    try {
        await userModel.updateUser(userId, username, password, email, userType, name, address, city, state, zip_code, country);
        res.status(201).send({ message: 'Successfully updating user' });
    } catch (err) {
        console.error('Successfully updating user', err);
        res.status(500).send({ message: 'Successfully updating user' });
    }
};

const deleteUser= async (req, res) => {
    const { userId } = req.params;
  
    try{
      await userModel.deleteUser(userId);
      res.status(201).send({ message: 'User deleting successfully' });
    } catch (err) {
      console.error('User deleting successfully', err);
      res.status(500).send({ message: 'User deleting successfully' });
    }
  };

module.exports = {
    listAllUsers,
    addUser,
    updateUser,
    deleteUser
};
