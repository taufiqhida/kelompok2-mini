const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/userControllers');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/users', controller.getAllUsers);
router.get('/users/:role', controller.getbyRole);

module.exports = router