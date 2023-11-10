const express = require('express');
const userAddressController = require('../controllers/user.address.controller');
router = express.Router();

router.post('/create', userAddressController.createAddress);
router.get('/', userAddressController.getAllAddresses);
router.get('/:addressId', userAddressController.getAddressById);
router.put('/update/:addressId', userAddressController.updateAddress);
router.delete('/delete/:addressId', userAddressController.deleteAddress);

module.exports = router;