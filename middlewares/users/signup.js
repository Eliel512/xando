const Joi = require('joi');
const User = require('../../models/user.model');

const baseSchema = Joi.object({
    email: Joi.string()
        .required(),
    // .email({ minDomainSegments: 2, allowFullyQualified: true })
    // .min(5)
    tel: Joi.string()
        .required(),
    password: Joi.string()
        .min(8)
        .required()
});

const buyerSchema = baseSchema.keys({
    fname: Joi.string()
        .min(2)
        .required(),
    mname: Joi.string()
        .min(2),    
    lname: Joi.string()
        .min(2)
        .required(),
    gender: Joi.string()
        .max(1)
        .required(),
    accountType: Joi.string()
        .valid('buyer')
        .required()
});

const sellerSchema = baseSchema.keys({
    name: Joi.string()
        .min(2)
        .required(),
    accountType: Joi.string()
        .valid('shop', 'realEstateAgency')
        .required()
});

const signupSchema = Joi.alternatives().try(buyerSchema, sellerSchema);

module.exports = (req, res, next) => {
    const body = req.body.accountType == 'buyer' ? {
        fname: req.body.firstName,
        mname: req.body.mname,
        lname: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
        accountType: req.body.accountType,
        password: req.body.password
    }:{
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        accountType: req.body.accountType,
        password: req.body.password
    };
    const { error, value } = signupSchema.validate(body);
    if (error) {
        console.log(error.details);
        return res.status(400).json(error.details);
    }
    User.exists({ email: value.email })
        .then(userExists => {
            if(userExists){
                return res.status(409).json({ message: 'Addresse email déja utilisée' });
            }
            next();
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        });
};