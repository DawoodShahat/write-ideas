const express = require('express');
router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/User');
const CustomEditor = require('../models/CustomEditor');

router.get('/login', (req, res) => {
    const { error } = req.query;
    if (error) return res.json({ error, msg: 'Make sure you provide correct credentials' });
    res.json({ msg: 'LoginPage' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/api',
    failureRedirect: '/api/users/login?error=invalid credentials',
}));


router.post('/logout', async (req, res) => {
    await req.logout();
    res.clearCookie('connect.sid');
    res.json({ redirectionUrl: '/login' });
});


router.get('/register', (req, res) => {
    res.json({ msg: "Register Page" });
});

router.post('/register', (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    let errors = [];

    // check required fileds
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // check password length
    if (password.length < 6) {
        errors.push({ msg: 'password  should be atleast 6 characters' });
    }

    if (errors.length > 0) {
        res.json({ errors: errors });
    } else {

        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'User with this Email is already registered' });
                    res.json({ errors: errors });
                } else {

                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // hash password 
                    // salt is a time for bcrypt to do the hashing
                    // the higher this value, the more time it takes to do hashing and thus making it difficult for brute-force attacks
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        const newEditorStyling = new CustomEditor({
                            author: ObjectId(newUser._id),
                            fontSize: 20,
                            fontFamily: 'Helvetica, sans-serif',
                            backgroundColor: '#fff'
                        });

                        const newUserResult = await newUser.save();
                        const newEditorStylingResult = await newEditorStyling.save();

                        if (newUserResult && newEditorStylingResult) {
                            res.json({ msg: 'user Created Successfully' })
                        }
                    }));
                }
            })
            .catch(err => res.json(err));
    }

});

module.exports = router;