const mongoose = require('mongoose'), { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model('category', categorySchema);

module.exports = Category;