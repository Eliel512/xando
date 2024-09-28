const Seller = require('../../models/seller.model');

module.exports = (req, res) => {
    Seller.findById(req.query.seller)
        .then(shop => {
            shop.isFeatured = !shop.isFeatured;
            shop.save()
                .then(() => res.status(200).json(shop))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};