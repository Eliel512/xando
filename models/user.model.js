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
    tel: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v);
            },
            message: props => `${props.value} n'est pas un numéro de téléphone valide!`
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
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'article',
        required: false
    }],
    imageUrl: {
        type: String,
        required: false,
    }
}, { timestamps: true, discriminatorKey: 'kind', collection: 'user' });

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema);

module.exports = User;