const { registerUser } = require('../helpers/user/registrationHelpers.js');
const { loginUser } = require('../helpers/user/loginHelpers.js')
const express = require('express');
const userRouter = express.Router();

// REGISTRATION ROUTES

userRouter.get('/register', (req, res) => {
    res.render('register')
})
userRouter.post('/register', registerUser);

// LOGIN ROUTES

userRouter.get('/login', (req, res) => {
    res.render('login')
})
userRouter.post('/login', loginUser);

// PROFILE ROUTES

userRouter.get('/profile', (req, res) => {
    res.render('profile', {user: req.user})
})

// LOGOUT ROUTES

userRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

// Exports

module.exports = { userRouter }