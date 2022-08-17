require("dotenv").config();

const PORT = process.env.PORT;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const DATABASE = process.env.DATABASE;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

module.exports = {
  PORT,
  ACCESS_TOKEN_SECRET,
  DATABASE_URL,
  DATABASE,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT
};