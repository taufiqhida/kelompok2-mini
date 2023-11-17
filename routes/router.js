const express = require('express'),
    router = express.Router(),
    userRouter = require('./user.router'),
    adminCategoryRouter = require('./admin.category.router'),
    permissionRouter = require("./permission.router"),
    cartsRouter = require('./carts.router')
     

router.use('/user', userRouter);
router.use('/category', adminCategoryRouter);
router.use("/permission", permissionRouter);
router.use("/carts", cartsRouter);


module.exports = router