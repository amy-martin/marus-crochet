const { registerUser } = require('../helpers/user/registrationHelpers.js');
const { updateUser, checkAuthenticated, checkNotAuthenticated } = require('../helpers/user/userHelpers')
const express = require('express');
const userRouter = express.Router();
const passport = require('passport')

// REGISTRATION ROUTES

// userRouter.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register')
// });

userRouter.post('/register', checkNotAuthenticated, registerUser);

// LOGIN ROUTES

// userRouter.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login')
// });

userRouter.post('/login', checkNotAuthenticated, passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res.status(401).json({message: err});
    }
    if (!user) {
        return res.status(401).json({message: info})
    }
    req.logIn(user, function (err) {
        if (err) next(err);
        return res.send(user)
    });
}))

// PROFILE ROUTES

userRouter.get('/profile', (req, res) => {
    res.render('profile', {user: req.user})
});

userRouter.put('/profile', passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res.status(401).json({message: err});
    }
    if (!user) {
        return res.status(401).json({message: info})
    }
}), updateUser);


// LOGOUT ROUTES

userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy()
    res.redirect('/login');
});

// Exports

module.exports = { userRouter }