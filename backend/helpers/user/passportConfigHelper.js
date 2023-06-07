
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Serializing and Deserializing Users to Create Persistent Logins

const initialize = (passport, findUserByUsername, fidnUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = await findUserByUsername(username);
        if (user == null) {
            return done(null, false, { err: true, message: 'No user with that username. Please try again or register to create an account.' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { err: true, message: 'Password or email incorrect. Please try again.' })
            }
        } catch (e) {
            done(e)
        }
    }
        passport.use(new LocalStrategy(authenticateUser));
        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => done(null, getUserById(id)))
    } 



module.exports = initialize
