const { pool } = require('../db/server.js');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const express = require('express');
const { response } = require('express');
const userRouter = express.Router();

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
}



// Function to check if user already exists
const findUser = async (email) => {
    try {
        const SQL = 'SELECT * FROM users WHERE email=$1';
        return await pool.query(SQL, [email])
    } catch (err) {
        console.log(err)
    }
}

// Function to check if username is already taken
const findUsername = async (username) => {
    try {
        const SQL = 'SELECT * FROM users WHERE username=$1';
        return await pool.query(SQL, [username])
    } catch (err) {
        console.log(err);
    }
}

// Registration function to create user in database
const createUser = (username, password, first_name, last_name, telephone, email) => {
    const hashedPassword = passwordHash(password, 10);
    const SQL = 'INSERT INTO users (username, password, first_name, last_name, telephone, email) VALUES ($1, $2, $3, $4, $5, $6)';

    pool.query(SQL, [username, hashedPassword, first_name, last_name, telephone, email], (error, results) => {
        if (error) {
            throw error
        }

        // results.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

// Callback function for register route that will register user and return success result
const registerUser = async (req, res) => {
    const {username, password, first_name, last_name, telephone, email} = req.query;
    try {
        // CHECK IF USER EXISTS IN DATABASE
        const userFound = await findUser(email);
        if (userFound.rows.length !== 0) {
            res.send('USER ALREADY EXISTS')
            return 
            // return res.reditect("login");
        }
        //CHECK IF USERNAME IS ALREADY TAKEN
        const usernameFound = await findUsername(username);
        if (usernameFound.rows.length !== 0) {
            res.send('USERNAME TAKEN')
            return
        } 
        await createUser(username, password, first_name, last_name, telephone, email);
        const createdUser = await findUser(email);
        res.send(`USER CREATED WITH ID: ${createdUser.rows[0].id}`)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
}

// Registration Route

userRouter.post('/register', registerUser);


//LOGIN FUNCTIONS



// Exports

module.exports = { userRouter }