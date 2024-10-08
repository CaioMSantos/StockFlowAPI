require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
});


const addSuppliers = async (name, phone, email, address, city, state, zip_code, country) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Inserir endereço na tabela Addresses
        const addressResult = await client.query(
            'INSERT INTO Addresses (address, city, state, zip_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING address_id',
            [address, city, state, zip_code, country]
        );
        const addressId = addressResult.rows[0].address_id;

        // Inserir fornecedor na tabela Suppliers
        await client.query(
            'INSERT INTO Suppliers (name, phone, email, address_id) VALUES ($1, $2, $3, $4)',
            [name, phone, email, addressId]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const listAllSuppliers = async () => {
    const client = await pool.connect();
    try {
        const suplliers = await client.query('SELECT * FROM suppliers s INNER JOIN addresses a on a.address_id = s.address_id');
        return suplliers.rows;
    } finally {
        client.release();
    }
};

const updateSupplier = async (supplierId, name, phone, email, address, city, state, zip_code, country) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Atualizar fornecedor na tabela Suppliers
        const addressResult = await client.query(
            'UPDATE Suppliers SET name = $1, phone = $2, email = $3, updating_date = $4 WHERE supplier_id = $5 RETURNING address_id',
            [name, phone, email, new Date().toISOString(), supplierId]
        );

        if (addressResult.rowCount === 0) {
            throw new Error(`Supplier with id ${supplierId} does not exist.`);
        }

        const addressId = addressResult.rows[0].address_id;

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

const deleteSupplier = async (supplier_id) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        //Deletar o usuario da base
        const deleteSupplierResult = await client.query(
            'DELETE from suppliers where supplier_id = $1 RETURNING address_id', [supplier_id]
        );


        if (deleteSupplierResult.rowCount === 0) {
            throw new Error(`Supplier with id ${supplier_id} does not exist.`);
        }

        const address_id = deleteSupplierResult.rows[0].address_id;

        //Deletar o endereço relacionado ao fornecedor
        const deleteAddressResult = await client.query(
            'DELETE from Addresses where address_id = $1 RETURNING address_id', [address_id]
        );

        if (deleteAddressResult.rowCount === 0) {
            throw new Error(`Address with supplier_id ${supplier_id} does not exist.`);
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
    addSuppliers,
    listAllSuppliers,
    updateSupplier,
    deleteSupplier
};

