const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')

const pgObject = {
    user: 'amymartin',
    // password: process.env.PW ? process.env.PW: null,
    host: 'localHost',
    database: 'Crochet ECommerce Database',
    port: '5433'
}


const pool = new Pool(pgObject);

module.exports = { pool }