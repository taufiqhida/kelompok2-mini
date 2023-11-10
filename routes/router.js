const express = require("express"),
  router = express.Router(),
  userRouter = require("./user.router"),
  adminCategoryRouter = require("./admin.category.router"),
  permissionRouter = require("./permission.router"),
  productVariantsRouter = require("./productVariants.router");

router.use("/user", userRouter);
router.use("/category", adminCategoryRouter);
router.use("/permission", permissionRouter);
router.use("/productVariants", productVariantsRouter);

module.exports = router;
