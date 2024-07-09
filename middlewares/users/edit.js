const path = require('path');
const Joi = require('joi');
const _ = require('lodash');
const User = require('../../models/user.model');

const editSchema = Joi.object({
    fname: Joi.string()
        .min(2),

    lname: Joi.string()
        .min(2),

    mname: Joi.string()
        .min(2),

    address: Joi.object().keys({
        city: Joi.string()
            .min(2),
        municipality: Joi.string()
            .min(2),
        street: Joi.string()
            .min(2),
        number: Joi.number(),
    }),

    email: Joi.string(),
    // .email({ minDomainSegments: 2, allowFullyQualified: true })
    // .min(5)

    accountType: Joi.string()
        .min(5),

    password: Joi.string()
        .min(8)
});

module.exports = (req, res, next) => {
    const { error, value } = editSchema.validate({
        fname: req.body.firstName,
        mname: req.body.middleName,
        lname: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        accountType: req.body.accountType,
        password: req.body.password
    });
    if (error) {
        console.log(error.details);
        return res.status(400).json(error.details);
    }
    for (let field in value) {
        if (typeof value[field] === "undefined") {
            delete value[field];
        }
    }
    if(value.email && !_.isEmail(value.email)){
        return res.status(400).json({ message: 'Email incorrect' });
    }
    
    User.exists({ email: value.email })
        .then(userExists => {
            if (userExists) {
                return res.status(409).json({ message: 'Addresse email déja utilisée' });
            }
            res.locals.value = value;
            if(req.file){
                res.locals.value.imageUrl = /*process.env.RENDER_EXTERNAL_URL + '/' +*/ path.join(
                    'profils', res.locals.userId, req.file.filename
                    );
            }
            if(_.isEmpty(value)){
                return res.status(400).json({ message: 'Requete vide' });
            }
            next();
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        });
};