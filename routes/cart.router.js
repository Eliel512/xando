const express = require('express');
const router = express.Router();

const getCart = require('../controllers/stuff/cart/getCart');
const addToCart = require('../controllers/stuff/cart/addToCart');
const removeFromCart = require('../controllers/stuff/cart/removeFromCart');

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:article', removeFromCart);

module.exports = router;