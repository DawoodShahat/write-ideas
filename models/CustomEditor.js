const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomEditorSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fontSize: {
        type: Number,
        required: true
    },
    fontFamily: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = CustomEditor = mongoose.model('CustomEditor', CustomEditorSchema);