const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/permission.controllers")

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.get("/", controller.getAllPermision);
router.get("/:id", controller.getPermisionById);
router.delete("/:id", controller.destroy);

module.exports = router