const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/user.model');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADDR, // your email address
        pass: process.env.EMAIL_PASS   // your email password
    }
});

module.exports = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Génération d'un token de réinitialisation valide pour 1 heure
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.RESET_PASS_KEY,
            { expiresIn: '1h' }
        );

        // Stockage du token et de son expiration dans la base de données
        user.resetToken = {
            token: resetToken,
            resetTokenExpiration: Date.now() + 3600000
        };
        await user.save();

        // URL de réinitialisation
        const resetURL = `${process.env.HOST}/reset-password/${resetToken}`;

        // Envoi de l'e-mail
        await transporter.sendMail({
            to: email,
            from: `"Xando Team" <${process.env.EMAIL_ADDR}>`,
            subject: 'Réinitialisation de mot de passe',
            html: `<p>Vous avez demandé une réinitialisation de mot de passe.</p>
                   <p>Ouvrez sur ce <a href="${resetURL}">lien: ${resetURL}</a> pour réinitialiser votre mot de passe.</p>`
        });

        res.status(200).json({ message: 'E-mail de réinitialisation envoyé' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur interne du serveur', error });
    }
};