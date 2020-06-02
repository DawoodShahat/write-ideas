const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function initialize(passport) {

    const authenticateUser = async (email, password, done) => {

        const user = await User.findOne({ email });

        if (!user || user.length === 0) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password Incorrect' });
            }

        } catch (e) {
            return done(e);
        }

    }

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    });

    passport.deserializeUser((user, done) => {
        return done(null, User.findById({ _id: user._id }));
    });
}

module.exports = initialize;