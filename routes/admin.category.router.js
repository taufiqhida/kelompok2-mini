const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/admin.category.controller");

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.get("/categories", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.delete("/:id", controller.destroy);

module.exports = router;
