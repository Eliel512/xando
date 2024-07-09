const Article = require('../../../models/article.model');
// const User = require('../../../models/user.model');
const Seller = require('../../../models/seller.model');

module.exports = (req, res) => {
    Seller.findOne({ _id: res.locals.userId, isValid: true/*, kind: 'seller' */})
        .then(user => {
            if(!user){
                return res.status(401).json({ message: 'Operation impossible' });
            }
            const imagesPath = req.files.map(file => file.path);
            const article = new Article({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                seller: res.locals.userId,
                category: res.locals.category,
                stock: req.body.stock,
                images: imagesPath
            });
            article.save()
                .then(() => {
                    Article.find({ seller: res.locals.userId }, { __v: 0 })
                        .populate({
                            path: 'seller',
                            select: '_id name accountType address'
                        })
                        .exec()
                        .then(articles => res.status(201).json(articles))
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({ message: 'Une erreur est survenue' });
                        });
                })
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