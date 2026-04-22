require('dotenv').config();
module.exports = {
  master: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'master'
  },
  credentials: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'credentials'
  },
  transaction: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'transaction'
  },
  workflow:{
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'workflow'
  },
  public: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'public'
  },
  inventory: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'inventory'
  },
  report: {
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.MAIN_DB_HOST,
    dialect: process.env.MAIN_DB_ENGINE,
    port: process.env.MAIN_DB_PORT,
    schema: 'report'
  },
  
};
