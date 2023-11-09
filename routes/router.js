const express = require('express'),
    router = express.Router(),
    userRouter = require('./user.router'),
    adminCategoryRouter = require('./admin.category.router'),
    permissionRouter = require("./permission.router") 

router.use('/user', userRouter);
router.use('/category', adminCategoryRouter);
router.use("/permission", permissionRouter)

module.exports = router