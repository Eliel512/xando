const mongoose = require('mongoose'), { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
// const isValidObjectId = require('../../tools/isValidObjectId');

const userSchema = new Schema({
    isValid: {
        type: Boolean,
        required: [true, 'Le champ \'isValid\' est requis.'],
        default: false
    },
    token: {
        type: String,
        required: false
    },
    connected_at: {
        type: Date,
        required: false
    },
    fname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Le champ \'fname\' est requis.']
    },
    mname: {
        type: String,
        trim: true,
        lowercase: true,
        required: false
    },
    lname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Le champ \'lname\' est requis.']
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F', 'O']
    },
    address: {
        city: {
            type: String,
            required: false
        },
        municipality: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        number: {
            type: String,
            require: false
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'L\'adresse email est requise'],
        validate: {
            validator: v => validator.isEmail(v),
            message: 'Email invalide'
        },
        set: v => validator.normalizeEmail(v),
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'article',
        required: false
    }],
    imageUrl: {
        type: String,
        required: false,
    }
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema);

module.exports = User;