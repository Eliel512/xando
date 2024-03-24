const express = require('express');
const router = express.Router();

const articlesRouter = require('./article.router');
const cartRouter = require('./cart.router');

const auth = require('../middlewares/users/auth');

router.use('/articles', articlesRouter);
router.use('/cart', auth, cartRouter);

module.exports = router;