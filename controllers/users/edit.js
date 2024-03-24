const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const value = {
        ...res.locals.value
    };
    if(value.password && typeof value.password == 'string'){
        try{
            value.password = bcrypt.hashSync(value.password, 10);
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        }
    }

    User.findOneAndUpdate({
        _id: res.locals.userId }, { $set: { ...value } },
        { new: true, projection: { __v: 0, password: 0, token: 0 }
    })
        .then(user => {
            res.status(200).json({
                _id: user._id,
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
}