const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')

const pgObject = {
    user: process.env.USER,
    password: process.env.PW ? process.env.PW: null,
    host: process.env.HOST,
    database: process.env.DB,
    port: process.env.DB_PORT
}

const pool = new Pool(pgObject);

module.exports = { pool }