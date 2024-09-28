const express = require('express');
const router = express.Router();

const articlesRouter = require('./article.router');
const cartRouter = require('./cart.router');
const adRouter = require('./ad.router');

const auth = require('../middlewares/users/auth');

const getAllCategories = require('../controllers/stuff/category/getAll');

router.use('/articles', articlesRouter);
router.use('/cart', auth, cartRouter);
router.use('/ad', adRouter);
router.get('/categories', getAllCategories);

module.exports = router;