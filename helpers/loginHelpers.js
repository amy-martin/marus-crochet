const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { passwordHash, findUsername } = require('../helpers/userHelpers.js')


// LOGIN HELPERS
// _____________

// Passport Local Strategy to Authenticate Users

const localStrategy = new LocalStrategy((username, password, done) => {
    const hashedPassword = passwordHash(password)
    findUsername(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password) {

        }
    })
})



const loginUser = () => {
    
};


module.exports = { loginUser, localStrategy }
