// routes/ProductRoutes.js
const express = require('express');
const { PlaceOrder } = require('../Controller/PlaceOrderController.js');
const VerifyToken = require('../Middleware/AuthUser.js');
const router = express.Router();

router.post('/addcartitems',PlaceOrder);

module.exports=router;