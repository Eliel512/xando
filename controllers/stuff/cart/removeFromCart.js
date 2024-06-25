const Cart = require('../../../models/cart.model');
const Article = require('../../../models/article.model');

module.exports = async (req, res) => {
    let article;
    try {
        article = await Article.findOne({ _id: req.params.article }, { _id: 1 });
        if (!article) {
            return res.status(404).json({ message: 'Article introuvable' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Une erreur est survenue' });
    }
    Cart.findOneAndUpdate({ user: res.locals.userId },
        { $pull: { items: { meta: article._id } } }, { new: true })
        .populate({
            path: 'articles.meta',
            select: '_id name price'
        })
        .exec()
        .then(cart => res.status(200).json(cart))
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};