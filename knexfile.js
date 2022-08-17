const { DATABASE, DATABASE_USER, DATABASE_PORT, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_URL } = require('./config')

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: DATABASE,
      user: DATABASE_USER,
      port: DATABASE_PORT,
      host: DATABASE_HOST
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    ssl: {
      rejectUnauthorized: false
    }
  }
};