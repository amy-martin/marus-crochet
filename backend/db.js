const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')

const pgObject = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    port: 5433
}

const pool = new Pool(pgObject);

module.exports = { pool }