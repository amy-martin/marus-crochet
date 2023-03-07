const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { passwordHash, findUserByUsername, fidnUserById } = require('./userHelpers.js')


// LOGIN HELPERS
// _____________

// Serializing and Deserializing Users to Create Persistent Logins

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    fidnUserById(id, (err, user)  => {
        if (err) {
            return done(err)
        }
        done(null, user);
    })
})
// Passport Local Strategy to Authenticate Users

passport.use(new LocalStrategy((username, password, done) => {
    const hashedPassword = passwordHash(password)
    findUserByUsername(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password != hashedPassword) {
            return done(null, false);
        }
        return done(null, user)
    })
}))



const loginUser = () => {
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('profile');
    }
};


module.exports = { loginUser }
