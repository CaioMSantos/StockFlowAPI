// models/userModel.js
const { Pool } = require('pg');
const config = require('../config');
const bcrypt = require('bcrypt');

const pool = new Pool(config.db);

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const addUser = async (username, password, email, userType, name, address, city, state, zip_code, country) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Inserir endereço na tabela Addresses
    const addressResult = await client.query(
      'INSERT INTO Addresses (address, city, state, zip_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING address_id',
      [address, city, state, zip_code, country]
    );
    const addressId = addressResult.rows[0].address_id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query('INSERT INTO users (username, password, address_id, email, usertype, name) VALUES ($1, $2, $3, $4, $5, $6)', [username, hashedPassword, addressId, email, userType, name]);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

};

const listAllUsers = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users u INNER JOIN addresses a on a.address_id = u.address_id');
    return result.rows;
  } finally {
    client.release();
  }
};

const updateUser = async (userId, username, password, email, userType, name, address, city, state, zip_code, country) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const hashedPassword = await bcrypt.hash(password, 10);

    //Atualizar as informações do Usuario
    const userUpdatingResult = await client.query(
      'UPDATE Users SET name = $1, username = $2, password = $3, email = $4, usertype = $5, updating_date = $6 WHERE id = $7 RETURNING address_id',
      [name, username, hashedPassword, email, userType, new Date().toISOString(), userId]
    );

    const addressId = userUpdatingResult.rows[0].address_id;

    // Atualizar endereço na tabela Addresses
    await client.query(
      'UPDATE Addresses SET address = $1, city = $2, state = $3, zip_code = $4, country = $5, updating_date = $6 WHERE address_id = $7',
      [address, city, state, zip_code, country, new Date().toISOString(), addressId]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const deleteUser = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    //Deletar o usuario da base
    const deleteUserResult = await client.query(
      'DELETE from Users where id = $1 RETURNING address_id', [userId]
    );

    if (deleteUserResult.rowCount === 0) {
      throw new Error(`User with id ${userId} does not exist.`);
    }

    const address_id = deleteUserResult.rows[0].address_id;

    //Deletar o endereço relacionado ao usuario
    const deleteAddressResult = await client.query(
      'DELETE from Addresses where address_id = $1 RETURNING address_id', [address_id]
    );

    if (deleteAddressResult.rowCount === 0) {
      throw new Error(`Address with user_id ${userId} does not exist.`);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  findUserByEmail,
  addUser,
  listAllUsers,
  updateUser,
  deleteUser
};
