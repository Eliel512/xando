// const User = require('../../models/user.model');
const Buyer = require('../../models/buyer.model');
const Seller = require('../../models/seller.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getValidationToken = require('../../utils/getValidationToken');

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let user = {
                email: req.body.email,
                tel: req.body.tel,
                password: hash
            }
            if(req.body.accountType == 'buyer'){
                user = new Buyer({
                    ...user,
                    fname: req.body.firstName,
                    mname: req.body.middleName,
                    lname: req.body.lastName,
                    gender: req.body.gender,
                });
            }else{
                user = new Seller({
                    ...user,
                    name: req.body.name,
                    address: {
                        city: req.body.address.city,
                        municipality: req.body.address.municipality,
                        street: req.body.address.street,
                        number: req.body.address.number
                    },
                    accountType: req.body.accountType,
                });
            }
            user.token = getValidationToken(user._id);

            user.save()
                .then(() => {
                    res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        firstName: user.fname,
                        middleName: user.mname,
                        lastName: user.lname,
                        gender: user.gender,
                        email: user.email,
                        tel: user.tel,
                        address: user.address,
                        imageUrl: user.imageUrl,
                        favorites: user.favorites,
                        accountType: user.accountType,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        token: jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '48h' }
                        )
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: 'Erreur interne du serveur' });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Erreur interne du serveur' })
        });
};