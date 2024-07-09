const Article = require('../../../models/article.model');

module.exports = (req, res) => {
    Article.findOne({ _id: req.params.id }, { __v: 0 })
        .populate({
            path: 'seller',
            select: '_id name accountType address'
        })
        .exec()
        .then(article => {
            if(!article){
                return res.status(404).json({ message: 'Article introuvable' });
            }
            res.status(200).json(article);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        });
};