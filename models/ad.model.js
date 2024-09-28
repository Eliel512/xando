const mongoose = require('mongoose'), { Schema } = require('mongoose');

const adSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;