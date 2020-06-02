const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WritingsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    writings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WritingInstance'
        }
    ]

})

module.exports = Writings = mongoose.model('Writings', WritingsSchema);