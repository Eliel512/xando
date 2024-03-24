const Article = require('../../../models/article.model');
const Category = require('../../../models/category.model');

module.exports = async (req, res) => {
    let category;
    if (req.query.category) {
        try {
            const cat = Category.findOne({ name: req.query.category });
            category = cat._id;
        } catch (error) {
            console.log(error);
            return res.statuss(500).json({ message: 'Une erreur est survenue' });
        }
    }
    const query = req.query.category ? { category: category, seller: req.params.id } :
        { seller: req.params.id };
    Article.find(query, { __v: 0 })
        .then(articles => res.status(200).json(articles))
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};