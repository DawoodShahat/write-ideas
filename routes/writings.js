const express = require('express');
const router = express.Router();
const Writings = require('../models/Writings');
const WritingInstance = require('../models/WritingInstance');
const User = require('../models/User');
const CustomEditor = require('../models/CustomEditor');
const ObjectId = require('mongoose').Types.ObjectId;
const checkAuthenticated = require('../config/checkAuthenticated');


// @route GET api/writings/:id
// @desc  returns current day writing if there is any 
// @access private 
router.get('/writings/:id?', checkAuthenticated, async (req, res) => {

    const todaysWritingId = req.params.id;
    const currentUserId = req.session.passport.user;

    const userData = await Writings.findOne({ author: ObjectId(currentUserId) })

    // check whether this is a new user or a returning user
    if (!userData) {

        //if new user
        const writingInstance = new WritingInstance({})
        await writingInstance.save();

        const userWritings = new Writings({
            author: currentUserId,
            writings: [writingInstance._id]
        });

        const result = await userWritings.save();
        res.json({ date: writingInstance.date, _id: writingInstance._id })

    } else {

        if (!todaysWritingId || todaysWritingId === "undefined") {
            // user has not written anything today
            const writingInstance = new WritingInstance({})
            const result = await writingInstance.save();

            await Writings.findOneAndUpdate(
                { author: ObjectId(currentUserId) },
                { $push: { writings: ObjectId(writingInstance._id) } }
            );

            res.json(result)

        } else {
            // if the user has written anything today, query it and return it to the front end
            const result = await WritingInstance.findOne({ _id: ObjectId(todaysWritingId) })

            // if inavlid writing instance id
            if (!result) return;

            // res.json({ todaysWritingId: result._id });
            res.json(result);
        }
    }
});

// @route POST api/writings
// @desc  saves current writing to db 
// @access private 
router.post('/savewritings', checkAuthenticated, async (req, res) => {

    const { todaysWritingId, words, wordsCount } = req.body;

    const result = await WritingInstance.findOneAndReplace(
        { _id: ObjectId(todaysWritingId) },
        { words, wordsCount },
        { new: true }
    );

    // if done successfully send msg to the user
    res.json(
        result
    );

});




// @route GET api/allwritings
// @desc  returns all writing instances by a single user
// @access private 
router.get('/allwritings', checkAuthenticated, async (req, res) => {

    const currentUserId = req.session.passport.user;
    const result = await Writings.find({ author: ObjectId(currentUserId) })
        .populate({
            path: 'writings',
            model: 'WritingInstance'
        });

    res.json(result);

});

// @route POST api/customstyling
// @desc  updates the styling of the editor
// @access private 
router.post('/customstyling', checkAuthenticated, async (req, res) => {

    const currentUserId = req.session.passport.user;
    const { fontSize, fontFamily, backgroundColor } = req.body;

    const result = await CustomEditor.findOneAndReplace(
        { author: ObjectId(currentUserId) },
        { author: ObjectId(currentUserId), fontSize, fontFamily, backgroundColor },
        { new: true }
    );

    res.json(result);
});

// @route GET api/customstyling
// @desc  returns the current styling of the editor
// @access private 
router.get('/customstyling', checkAuthenticated, async (req, res) => {
    const result = await CustomEditor.find({ author: ObjectId(req.session.passport.user) });
    if (result) res.json(result);
});

module.exports = router;












