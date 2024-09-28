const Ad = require('../../../models/ad.model');
const Article = require('../../../models/article.model');

module.exports = (req, res) => {
    Article.findOne({ _id: req.body.article }, { _id: 1, name: 1 })
        .then(article => {
            const ad = new Ad({
                title: article.name,
                imageUrl: req.body.image,
                link: article._id
            });
            ad.save()
                .then(() => res.status(201).json(ad))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
}