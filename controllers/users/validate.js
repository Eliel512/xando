const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADDR, // your email address
        pass: process.env.EMAIL_PASS   // your email password
    }
});

module.exports = (req, res) => {
    User.findById(res.locals.userId)
        .then(user => {
            switch (req.body.action) {
                case 'validate':
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
                    break;
                
                case 'get':
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
                    res.status(200).json({ message: 'E-mail envoyé avec succès' });
                    break;
            
                default:
                    res.status(400).json({ message: 'Action inconnue' });
                    break;
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};