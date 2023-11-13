const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/roles.controller")

router.post("/create", controller.create)

module.exports = router