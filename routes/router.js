const express = require('express'),
    router = express.Router(),
    userRouter = require('./user.router'),
    adminCategoryRouter = require('./admin.category.router'); 

router.use('/user', userRouter);
router.use('/category', adminCategoryRouter);

module.exports = router