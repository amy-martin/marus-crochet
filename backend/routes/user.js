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
            const token = generateToken(user)
            res.cookie('token', token, {httpOnly: true, secure:true})
            return res.json({ message: 'Login successful', user })
        });

    })(req, res, next)
});




// PROFILE ROUTES

// userRouter.get('/profile', checkAuthenticated, (req, res) => {
//     try {
//         return res.status(200).json({user: req.user})
//     } catch (err) {
//         console.log(err)
//     }
// });

userRouter.put('/profile', verifyToken, updateUser);


// LOGOUT ROUTES

userRouter.get('/logout', verifyToken, (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err) };
    });
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'})
});

// Exports


module.exports = { userRouter }

  