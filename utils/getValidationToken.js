const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

modules.exports = userId => {
    // Utilisez uuidv4 pour générer un identifiant unique
    const uniqueId = uuidv4();

    // Utilisez crypto pour créer un hash du token
    const hash = crypto.createHash('sha256').update(uniqueId + userId).digest('hex');

    // Récupérez les 6 premiers caractères du hash comme token
    const token = hash.slice(0, 6);

    return token;
};