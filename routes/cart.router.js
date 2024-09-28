const express = require('express');
const router = express.Router();

const getCart = require('../controllers/stuff/cart/getCart');
const addToCart = require('../controllers/stuff/cart/addToCart');
const removeFromCart = require('../controllers/stuff/cart/removeFromCart');
const validate = require('../controllers/stuff/cart/validate');
const getAllValid = require('../controllers/stuff/cart/getAllValid');

const isAdmin = require('../middlewares/users/isAdmin');

router.get('/', getCart);
router.get('/valid', isAdmin, getAllValid);
router.post('/', addToCart);
router.post('/valid', validate);
router.delete('/:article', removeFromCart);

module.exports = router;