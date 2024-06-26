const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const mainPath = path.resolve(__dirname, '../../');
        const dir = path.join(mainPath, 'articles', req.userId);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        const name = Date.now() + file.originalname.split(' ').join('_');
        callback(null, name);
    }
});

module.exports = multer({ storage: storage }).array('files');