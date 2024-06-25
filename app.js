const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require("morgan");
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const appRoutes = require('./routes/app.router');

app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Xando API',
            description: 'This API enables developers to seamlessly integrate Xando\'s marketplace buying and selling functionalities into their own applications.',
            version: '0.1.0',
        },
    },
    apis: ['./routes/*.router.js'],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(morgan("tiny"));
app.use(compression());

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/profils', express.static(path.join(__dirname, 'profils')));

app.use('/api', appRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

module.exports = app;