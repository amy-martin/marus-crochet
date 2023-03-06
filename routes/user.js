const { findUser, findUsername, createUser } = require('../helpers/userHelpers.js')
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const userRouter = express.Router();

// REGISTRATION
// ____________

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

// LOGIN
// _____

// Exports

module.exports = { userRouter }