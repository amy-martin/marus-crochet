const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { findUserByUsername, findUserById } = require('../user/userHelpers');


const initializePassport = () => {
    passport.use('local',
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await findUserByUsername(username);

                if (!user) {
                    return done(null, false, { message: 'Invalid username or password'})
                }
                
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Invalid username or password'})
                };

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    })
}

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        console.log('User not authenticated')
        res.status(401).json({message: 'User not authenticated'})}
}

// Middleware function to check if user is not authenticated

const checkNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    } else throw new Error('User is already logged in!')
}

module.exports = {initializePassport, checkAuthenticated, checkNotAuthenticated};