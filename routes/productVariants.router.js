const express = require("express");
const router = express.Router();
const controller = require("../controllers/productVariants.controllers");

router.post("/create", controller.create);

module.exports = router;
