// const User = require('../../models/user.model');
const Buyer = require('../../models/buyer.model');
const Seller = require('../../models/seller.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const getValidationToken = require('../../utils/getValidationToken');

// Configure the email transport using the IONOS SMTP server
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADDR, // your email address
        pass: process.env.EMAIL_PASS   // your email password
    }
});

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
                    // Set up email data
                    const mailOptions = {
                        from: `"Xando Team" <${process.env.EMAIL_ADDR}>`, // sender address
                        to: user.email, // list of receivers
                        subject: 'Xando Account Email Validation', // Subject line
                        text: `Hello,
                        Thank you for registering with Xando. To complete your registration, please use the following token to validate your email address:
                        Token: ${user.token}
                        Please enter this token on the email validation form on the Xando website.
                        Thank you,
                        The Xando Team`, // plain text body for non-HTML clients
                        html: `
                        <!DOCTYPE html>
                        <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        margin: 0;
                                        padding: 0;
                                        background-color: #f6f6f6;
                                        color: #333333;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        padding: 20px;
                                        background-color: #ffffff;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        text-align: center;
                                        padding: 10px 0;
                                        background-color: #007bff;
                                        color: #ffffff;
                                    }
                                    .content {
                                        padding: 20px;
                                        text-align: center;
                                    }
                                    .token {
                                        font-size: 20px;
                                        font-weight: bold;
                                        color: #007bff;
                                    }
                                    .footer {
                                        text-align: center;
                                        padding: 10px;
                                        font-size: 12px;
                                        color: #888888;
                                    }
                                    @media only screen and (max-width: 600px) {
                                        .container {
                                            width: 100%;
                                            padding: 10px;
                                        }
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <h1>Xando Team</h1>
                                    </div>
                                    <div class="content">
                                        <p>Hello,</p>
                                        <p>Thank you for registering with Xando. To complete your registration, please use the following token to validate your email address:</p>
                                        <p class="token">${user.token}</p>
                                        <p>Please enter this token on the email validation form on the Xando website.</p>
                                        <p>Thank you,<br>The Xando Team</p>
                                    </div>
                                    <div class="footer">
                                        <p>&copy; 2024 Xando. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                        </html>` // html body with inline styles for responsiveness and design
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        // console.log('Message sent: %s', info.messageId);
                        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    });

                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        isValid: user.isValid,
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