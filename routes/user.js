const { registerUser } = require('../helpers/registrationHelpers.js');
const { loginUser } = require('../helpers/loginHelpers.js')
const express = require('express');
const userRouter = express.Router();

// Registration Route

userRouter.post('/register', registerUser);

// LOGIN
// _____

// passport.use(localStrategy)
userRouter.post('/login', loginUser);

// Exports

module.exports = { userRouter }