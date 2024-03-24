const Cart = require('../../../models/cart.model');

module.exports = (req, res) => {
    Cart.findOne({ user: res.locals.userId }, { __v: 0, user: 0 })
        .populate({
            path: 'articles.meta',
            select: '_id name price'
        })
        .exec()
        .then(cart => res.status(200).json(cart))
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        })
};