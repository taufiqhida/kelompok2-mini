const express = require("express"),
    router = express.Router(),
    controller = require('../controllers/carts.controller')

router.post("/", controller.addToCart);
router.put("/:id", controller.updateCartItem);
// router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCartByUserId);
router.delete("/:id", controller.deleteCartItem);

module.exports = router;