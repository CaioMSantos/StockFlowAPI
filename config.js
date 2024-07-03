module.exports = {
    db: {
      user: process.env.DB_USER || 'caiomarcio',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'banco_tcc',
      password: process.env.DB_PASSWORD || 'Caiosantos123@',
      port: process.env.DB_PORT || 5432,
    }
  };