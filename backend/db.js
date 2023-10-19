const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')

const pgObject = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    passoword: process.env.PW ? process.env.PW: null,
    port: process.env.PORT
}

const pool = new Pool(pgObject);

module.exports = { pool }