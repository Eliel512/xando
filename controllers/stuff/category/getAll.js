const Category = require('../../../models/category.model');

module.exports = (req, res) => {
    Category.find({  })
     .then(categories => res.status(200).json(categories))
     .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Une erreur est survenue' });
     });
};