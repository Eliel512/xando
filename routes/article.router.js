const express = require('express');
const router = express.Router();

const getAll = require('../controllers/stuff/articles/getAll');
const getOne = require('../controllers/stuff/articles/getOne');
// const getAllForOne = require('../controllers/stuff/articles/getAllForOne');
const createOne = require('../controllers/stuff/articles/createOne');
const deleteOne = require('../controllers/stuff/articles/deleteOne');

const multer = require('../middlewares/articles/createOne');
const auth = require('../middlewares/users/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, multer, createOne);
router.delete('/:id', auth, deleteOne);

module.exports = router;