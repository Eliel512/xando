const Category = require('../../models/category.model');

module.exports = (req, res, next) => {
    Category.findOne({ name: req.body.category })
        .then(async category => {
            if(!category){
                category = new Category({
                    name: req.body.category
                });
                try{
                    await category.save()
                }catch(error){
                    console.log(error);
                    return res.status(500).json({ message: "Une erreur est survenue" });
                }
            }
            res.locals.category = category._id;
            next();
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        })
};