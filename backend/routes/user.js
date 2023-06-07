const { registerUser } = require('../helpers/user/registrationHelpers.js');
const { updateUser, checkAuthenticated, checkNotAuthenticated } = require('../helpers/user/userHelpers')
const express = require('express');
const userRouter = express.Router();
const passport = require('passport')

// REGISTRATION ROUTES

userRouter.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
});

userRouter.post('/register', 
checkNotAuthenticated, 
registerUser);

// LOGIN ROUTES

userRouter.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res.status(401).json({err});
    }
    if (!user) {
        return res.status(401).json({info})
    }
    req.logIn(user, (err) => {
        if (err) next(err);
        return res.send(user)
    });
    })(req, res, next)
},   function(req, res) {
    // if this gets called then authentication was successful
    res.cookie('session', { id: req.user.id,secure: true, signed: true, expires: new Date(Date.now() + 3600) });
 });
 
// PROFILE ROUTES

userRouter.get('/profile', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res.status(401).json({err});
    }
    if (!user) {
        return res.status(401).json({info})
    }
})(req,res,next)
}, (req, res) => {
    try {
        return res.status(200).json({user: req.user})
    } catch (err) {
        console.log(err)
    }
});

userRouter.put('/profile', updateUser);


// LOGOUT ROUTES

userRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});

// Exports

module.exports = { userRouter }