const User = require('../../models/user.model');

module.exports = (req, res) => {
    const query = { kind: req.params.type };
    if(req.params.type == 'seller' && req.query.sellerType){
        query.accountType = req.params.sellerType;
    }
    User.find(query, { password: 0 })
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};