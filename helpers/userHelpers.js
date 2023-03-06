const { pool } = require('../db/server.js');
const bcrypt = require('bcrypt');

// REGISTRATION HELPERS
// ____________________

// Password Hashing Function
const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash
    } catch (err) {
        console.log(err);
    }
    return null;
};

// Function to check if user already exists
const findUser = async (email) => {
    try {
        const SQL = 'SELECT * FROM users WHERE email=$1';
        return await pool.query(SQL, [email])
    } catch (err) {
        console.log(err)
    }
};

// Function to check if username is already taken
const findUsername = async (username) => {
    try {
        const SQL = 'SELECT * FROM users WHERE username=$1';
        return await pool.query(SQL, [username])
    } catch (err) {
        console.log(err);
    }
};

// Registration function to create user in database
const createUser = async (username, password, first_name, last_name, telephone, email) => {
    const hashedPassword = await passwordHash(password, 10);
    const SQL = 'INSERT INTO users (username, password, first_name, last_name, telephone, email) VALUES ($1, $2, $3, $4, $5, $6)';

    pool.query(SQL, [username, hashedPassword, first_name, last_name, telephone, email], (error, results) => {
        if (error) {
            throw error
        }
    })
}


// LOGIN HELPERS
// _____________






module.exports = { passwordHash, findUser, findUsername, createUser }