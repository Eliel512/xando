const Ad = require('../../../models/ad.model');

module.exports = (req, res) => {
    Ad.find({  })
        .then(ads => res.status(200).json(ads))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};