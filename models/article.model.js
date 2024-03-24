const mongoose = require('mongoose'), { Schema } = require('mongoose');

const articleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
}, { timestamps: true });

// Création du modèle Article à partir du schéma
const Article = mongoose.model('article', articleSchema);

// Export du modèle pour l'utiliser ailleurs dans l'application
module.exports = Article;
