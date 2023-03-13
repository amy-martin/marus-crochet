const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')

const pgObject = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    port: 5432
}

const pool = new Pool(pgObject);
 
// const SQL = `SELECT * FROM user `;
// pool.query(SQL, (err, res) => {
//     console.log(err, res)
//     pool.end();})

module.exports = { pool }