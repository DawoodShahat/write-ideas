const mongoose = require('mongoose');

const WritingInstanceSchema = new mongoose.Schema({
    words: {
        type: String,
        default: ''
    },
    wordsCount: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: new Date().toString()
    }
})

module.exports = WritingInstance = mongoose.model('WritingInstance', WritingInstanceSchema);