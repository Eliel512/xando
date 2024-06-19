const { Schema } = require('mongoose');
const User = require('./user.model');

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
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
    accountType: {
        type: String,
        required: true,
        enum: ['shop', 'realEstateAgency'],
        default: 'shop'
    }
}, { timestamps: true, discriminatorKey: 'kind', collection: 'user' });

const Seller = User.discriminator('seller', sellerSchema);

module.exports = Seller;