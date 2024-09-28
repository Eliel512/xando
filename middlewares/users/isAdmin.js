const User = require('../../models/user.model');

module.exports = (req, res) => {
    User.findOne({ _id: res.locals.userId, isAdmin: true })
        .then(user => {
            if(!user){
                return res.status(401).json({ message: 'Operation impossible' });
            }
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};