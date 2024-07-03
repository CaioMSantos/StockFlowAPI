// models/userModel.js
const { Pool } = require('pg');
const config = require('../config');
const bcrypt = require('bcrypt');

const pool = new Pool(config.db);

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
};

const listAllUsers = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  findUserByUsername,
  addUser,
  listAllUsers
};
