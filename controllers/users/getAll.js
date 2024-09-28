const User = require('../../models/user.model');

module.exports = (req, res) => {
    User.find({  }, { password: 0 })
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};