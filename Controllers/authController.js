// controllers/authController.js
const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error querying the database', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    await userModel.addUser(username, password);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering the user', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
  register
};
