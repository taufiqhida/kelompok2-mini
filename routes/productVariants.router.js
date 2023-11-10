const express = require("express");
const router = express.Router();
const controller = require("../controllers/productVariants.controllers");

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.get("/", controller.getAll);
router.get("/:id", controller.getId);
router.delete("/:id", controller.delete);

module.exports = router;
