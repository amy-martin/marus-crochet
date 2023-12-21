const { pool } = require('../db.js');
const { generateToken, verifyToken } = require('../helpers/config/cookies.js');
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/config/passport.js');
const { addShoppingSession } = require('../helpers/shoppingSession/shoppingSessionHelpers.js');
const { registerUser } = require('../helpers/user/registrationHelpers.js');
const { updateUser } = require('../helpers/user/userHelpers')
const express = require('express');
const userRouter = express.Router();
const passport = require('passport');


// REGISTRATION ROUTES

userRouter.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
});

userRouter.post('/register', checkNotAuthenticated, registerUser);

// LOGIN ROUTES

userRouter.post('/login', (req, res, next) => {
    const allowedOrigins = ['https://maru-crochet-fe.onrender.com', 'http://localhost:3000/' ];
    const origin = req.get('Origin');
    const isCrossSiteRequest = origin && !allowedOrigins.includes(origin);
    if (isCrossSiteRequest) {
        passport.authenticate('local', {session: true}, (err, user, info) => {
            if (err) {
                throw err
            }
            if (!user) {
                return res.status(401).json({message: info.message})
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                if (req.isAuthenticated()) {
                    const token = generateToken(user)
                    res.cookie('token', token, {httpOnly: true, secure:true, sameSite:'None'})
                    return res.json({ message: 'Login successful', user })
                }
    
            });
    
        })(req, res, next)
    }
    else {
        console.log('Not from allowed origin')
    }

});



userRouter.put('/profile', verifyToken, updateUser);


// LOGOUT ROUTES

userRouter.get('/logout', verifyToken, async (req, res, next) => {

    req.logout((err) => {
      if (err) { return next(err) };
    });
    
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'})
});

// Exports


module.exports = { userRouter }

  