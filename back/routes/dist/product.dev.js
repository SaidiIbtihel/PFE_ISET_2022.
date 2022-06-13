"use strict";

var express = require('express');

var router = express.Router();

var productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/order', productCtrl.orderProducts);
module.exports = router;