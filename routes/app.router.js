const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const stuffRouter = require('./stuff.router');

router.use('/users', authRouter);
router.use('/stuff', stuffRouter);

module.exports = router;