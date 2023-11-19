const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/admin.product.controller");

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.get("/products", controller.getAllProduct);
router.get("/:id", controller.detail);
router.delete("/:id", controller.destroy);

module.exports = router;