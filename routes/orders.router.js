const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/orderControllers");

router.post("/create-order", controller.createOrder);

module.exports = router;
