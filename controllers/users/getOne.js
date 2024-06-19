const User = require('../../models/user.model');

module.exports = (req, res, next) => {
    const userId = res.locals.userId;

    User.findById(userId,
        '_id name fname mname lname gender tel email address accountType favorites imageUrl createdAt updatedAt')
        .then(user => {
            if(!user){
                return res.status(500).json({ message: 'Une erreur est survenue' });
            }
            res.status(200).json({
                _id: user._id,
                name: user.name,
                tel: user.tel,
                firstName: user.fname,
                lastName: user.lname,
                middleName: user.mname,
                gender: user.gender,
                email: user.email,
                address: user.address,
                favorites: user.favorites,
                accountType: user.accountType,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                imageUrl: user.imageUrl
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};