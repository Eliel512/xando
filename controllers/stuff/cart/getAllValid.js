const Cart = require('../../../models/cart.model');

module.exports = (req, res) => {
    Cart.find({ isValid: true })
        .populate({
            path: 'user',
            select: '_id fname mname name lname email tel imageUrl'
        })
        .populate({
            path: 'articles.meta',
            select: '_id name price'
        })
        .exec()
        .then(carts => res.status(200).json(carts))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
}