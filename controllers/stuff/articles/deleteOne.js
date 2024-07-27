const Article = require('../../../models/article.model');
const User = require('../../../models/user.model');
const fs = require('fs');

module.exports = (req, res) => {
    Article.findOneAndDelete({ _id: req.params.id, seller: res.locals.userId })
        .then(article => {
            if(!article){
                return res.status(400).json({ message: 'Operation impossible' });
            }
            article.images.forEach(image => {
                fs.unlink(image, err => {
                    if(err){
                        console.log(err);
                        return res.satus(500).json({ message: 'Une erreur est survenue' });
                    }
                })
            });
            Article.find({ seller: res.locals.userId }, { __v: 0 })
                .populate({
                    path: 'seller',
                    select: '_id nsme accountType address'
                })
                .populate({
                    path: 'category',
                    select: '_id name description'
                })
                .exec()
                .then(articles => res.status(200).json(articles))
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};