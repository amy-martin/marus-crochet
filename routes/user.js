const { registerUser, localStrategy } = require('../helpers/userHelpers.js');
const validator = require('validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const userRouter = express.Router();

// REGISTRATION
// ____________


// Registration Route

userRouter.post('/register', registerUser);

// LOGIN
// _____

passport.use(localStrategy)
userRouter.post('/login', loginUser)

// Exports

module.exports = { userRouter }