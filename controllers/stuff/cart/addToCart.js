const Cart = require('../../../models/cart.model');
const Article = require('../../../models/article.model');

module.exports = async (req, res) => {
    let article;
    try{
        article = await Article.findOne({ _id: req.body.article }, { _id: 1 });
        if(!article){
            return res.status(404).json({ message: 'Article introuvable' });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Une erreur est survenue' });
    }
    article = {
        meta: article._id,
        quantity: req.body.quantity ? req.body.quantity : 1
    };
    Cart.findOneAndUpdate({ user: res.locals.userId }, { $push: { articles: article } }, { new: true })
        .then(cart => res.status(200).json(cart))
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};