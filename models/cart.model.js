const mongoose = require('mongoose'), { Schema } = require('mongoose');

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    articles: [
        {
            meta: {
                type: Schema.Types.ObjectId,
                ref: 'article'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;