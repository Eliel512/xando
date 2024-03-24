const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    User.findOne({ email: req.body.email }, { __v: 0, token: 0 })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        _id: user._id,
                        firstName: user.fname,
                        middleName: user.mname,
                        lastName: user.lname,
                        gender: user.gender,
                        email: user.email,
                        address: user.address,
                        accountType: user.accountType,
                        favorites: user.favorites,
                        imageUrl: user.imageUrl,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        token: jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '48h' }
                        )
                    });
                })
                .catch(() => res.status(400).json({
                    message: 'Vérifiez la validité des données.'
                }));
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({
            message: 'Vérifiez la validité des données.'
        })
    });
};