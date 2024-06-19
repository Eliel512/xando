const { Schema } = require('mongoose');
const User = require('./user.model');

const buyerSchema = new Schema({
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
    }
}, { timestamps: true, discriminatorKey: 'kind', collection: 'user' });

const Buyer = User.discriminator('buyer', buyerSchema);

module.exports = Buyer;