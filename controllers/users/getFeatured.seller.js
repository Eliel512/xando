const Seller = require('../../models/seller.model');

module.exports = (req, res) => {
    const query = req.query.sellerType ?
        { sellerType, isFeatured: true } : { isFeatured: true };

    Seller.find(query, { password: 0 })
        .then(featureds => res.status(200).json(featureds))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};