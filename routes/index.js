const express = require('express');
router = express.Router();
const checkAuthenticated = require('../config/checkAuthenticated');

const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', checkAuthenticated, async (req, res) => {

    const currentUserId = req.session.passport.user
    const currentUser = await User.find({ _id: ObjectId(currentUserId) }, { name: 1, email: 1 })

    res.json({
        msg: currentUser,
        redirectionSuccess: true,
        redirectionUrl: "/"
    });
});



module.exports = router;