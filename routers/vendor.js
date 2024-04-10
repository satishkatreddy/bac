const express = require('express');
const router = express.Router();
const {createVendor, logIn, getAllVendors, getSingleVender}= require('../controllers/vendorController');

router.post('/create', createVendor);
router.post('/logIn', logIn);
router.get('/Allvenders', getAllVendors);
router.get('/singleVender/:id', getSingleVender);


module.exports = router;