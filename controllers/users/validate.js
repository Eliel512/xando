const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    User.findById(res.locals.userId)
        .then(user => {
            if(req.body.token == user.token){
                User.findOneAndUpdate({
                    _id: res.locals.userId }, { $set: { isValid: true }
                }, { new: true })
                    .then(user => {
                        res.status(200).json({
                            _id: user._id,
                            isValid: user.isValid,
                            firstName: user.fname,
                            lastName: user.lname,
                            gender: user.gender,
                            email: user.email,
                            address: user.address,
                            accountType: user.accountType,
                            favorites: user.favorites,
                            imageUrl: user.imageUrl,
                            token: jwt.sign(
                                { _id: user._id },
                                process.env.TOKEN_KEY,
                                { expiresIn: '48h' }
                            )
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ message: 'Une erreur est survenue' });
                    })
            }else{
                res.status(400).json({ message: 'Token invalide' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};