const Ad = require('../../../models/ad.model');

module.exports = (req, res) => {
    Ad.findOne({ _id: req.params.id })
        .then(ad => res.status(200).json(ad))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};