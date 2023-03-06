const { findUser, findUsername, createUser } = require('../helpers/userHelpers.js');
const validator = require('validator');
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
        // DATA VALIDATION AND FORMATTING
        if (!validator.isLength(username, {min: 2, max:20})) {
            if (username.length < 2) {
                res.send('USERNAME TOO SHORT')
            }
            if (username.length > 20) {
                res.send('USERNAME TOO LONG')
            }
            return
        }
        // PASSWORD STRENGTH; REFER TO DOCUMENTATION WHEN CREATED FRONT END PROMPT
        // if (!validator.isStrongPassword(password)) {
        //     res.send('PASSWORD NOT STRONG ENOUGH');
        // }

        if (!validator.isLength(first_name, {min: 2, max:20})) {
            if (first_name.length < 2) {
                res.send('FIRST NAME TOO SHORT')
            }
            if (first_name.length > 20) {
                res.send('FIRST NAME TOO LONG')
            }
            return
        }
        if (!validator.isLength(last_name, {min: 2, max:20})) {
            if (last_name.length < 2) {
                res.send('LAST NAME TOO SHORT')
            }
            if (last_name.length > 20) {
                res.send('LAST NAME TOO LONG')
            }
            return
        }
        // if (!validator.isMobilePhone(telephone)) {
        //     res.send('INVALID PHONE NUMBER');
        //     return
        // }
        if (!validator.isEmail(email)) {
            res.send('INVALID EMAIL');
            return
        }
        const formattedEmail = validator.normalizeEmail(email);

        // CHECK IF USER EXISTS IN DATABASE
        const userFound = await findUser(formattedEmail);
        if (userFound.rows.length !== 0) {
            res.send('USER ALREADY EXISTS')
            return 
            // return res.reditect("login");
        };
        //CHECK IF USERNAME IS ALREADY TAKEN
        const usernameFound = await findUsername(username);
        if (usernameFound.rows.length !== 0) {
            res.send('USERNAME TAKEN')
            return
        } 
        await createUser(username, password, first_name, last_name, telephone, formattedEmail);
        const createdUser = await findUser(formattedEmail);
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