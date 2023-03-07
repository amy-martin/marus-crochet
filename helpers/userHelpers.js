const { pool } = require('../db/server.js');
const bcrypt = require('bcrypt');


// MISCELLANEOUS USER HELPERS

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
const findUser = async (email, cb) => {
    try {
        const SQL = 'SELECT * FROM users WHERE email=$1';
        const foundUser = await pool.query(SQL, [email])
        if (cb) {
            cb(null, foundUser.rows[0]);
        }
        return foundUser
    } catch (err) {
        console.log(err)
        if (cb) {
            cb(err, null);
        }
        
    }
};

// Function to check if username is already taken
const findUsername = async (username, cb) => {
    try {
        const SQL = 'SELECT * FROM users WHERE username=$1';
        const foundUser = await pool.query(SQL, [username])
        if (cb) {
            cb(null, foundUser.rows[0]);
        }
        return foundUser;
    } catch (err) {
        console.log(err);
        if (cb) {
            cb(err, null);
        }
    }
};

module.exports = { passwordHash, findUser, findUsername }