const express = require('express');
const router = express.Router();

const auth = require('../middlewares/users/auth');
const isAdmin = require('../middlewares/users/isAdmin');

const getAll = require('../controllers/stuff/ad/getAll');
const getOne = require('../controllers/stuff/ad/getOne');
const postOne = require('../controllers/stuff/ad/postOne');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, isAdmin, postOne);

module.exports = router;