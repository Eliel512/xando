const Cart = require('../../../models/cart.model');

module.exports = (req, res) => {
    Cart.findOne({ _id: req.body.cart, user: res.locals.userId })
        .populate({
            path: 'articles.meta',
            select: '_id name price'
        })
        .exec()
        .then(cart => {
            cart.isValid = !cart.isValid;
            cart.save()
                .then(() => res.status(200).json(cart))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};