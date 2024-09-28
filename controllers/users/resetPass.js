const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { token } = req.body;
    const { newPassword } = req.body;

    try {
        // Vérification et décodage du token
        const decodedToken = jwt.verify(token, process.env.RESET_PASS_KEY);

        // Recherche de l'utilisateur avec le token valide
        const user = await User.findOne({
            _id: decodedToken.userId,
            resetToken: {
                token,
                resetTokenExpiration: { $gt: Date.now() } // Vérifier si le token n'est pas expiré
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré' });
        }

        // Hachage du nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mise à jour du mot de passe de l'utilisateur
        user.password = hashedPassword;
        user.resetToken = {
            token: undefined,
            resetTokenExpiration: undefined
        };

        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });

    } catch (error) {
        res.status(500).json({ message: 'Erreur interne du serveur', error });
    }
};