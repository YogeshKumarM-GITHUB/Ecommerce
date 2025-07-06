// routes/ProductRoutes.js
const express = require('express');
const { PlaceOrder,FetchOrderedItemsUserWise,FecchAllOrdersforadmin,UpdateOrderStatusByAdmin } = require('../Controller/PlaceOrderController.js');
const VerifyToken = require('../Middleware/AuthUser.js');
const router = express.Router();

router.post('/addcartitems',PlaceOrder);
router.get('/fetchorders/:UserId',FetchOrderedItemsUserWise)
router.get('/fetchordersadmin',FecchAllOrdersforadmin)
router.put('/updateOrderStatus/:OrderId/:Status',UpdateOrderStatusByAdmin)
module.exports=router;