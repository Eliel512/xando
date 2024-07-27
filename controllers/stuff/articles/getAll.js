const Article = require('../../../models/article.model');
const Category = require('../../../models/category.model');

module.exports = async (req, res) => {
  let category;
  if(req.query.category){
      try {
          const cat = await Category.findOne({ name: req.query.category });
          category = cat._id;
      } catch (error) {
          console.log(error);
          return res.statuss(500).json({ message: 'Une erreur est survenue' });
      }
  }
  const query = req.query.category ? { category } : {};
  if(req.query.seller) query.seller = req.query.seller;
    Article.find(query, { __v: 0 })
        .populate({
          path: 'seller',
          select: '_id name accountType address'
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
};