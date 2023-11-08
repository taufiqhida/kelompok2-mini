const express = require('express'),
    router = express.Router(),
    userRouter = require('./user.router');

router.use('/user', userRouter);

module.exports = router