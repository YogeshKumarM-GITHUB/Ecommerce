// routes/ProductRoutes.js
const express = require('express');
const upload = require('../Config/MulterConfig');
const { AddProduct, GetAllProducts,DeleteProductById,Getbestsellerproducts,GetSingleProduct } = require('../Controller/ProductController');
const VerifyToken = require('../Middleware/AuthUser.js');
const router = express.Router();

router.post(
  '/addproduct',
  upload.fields([
    { name: 'FirstImage',maxCount:1 },
    { name: 'SecondImage',maxCount:1 },
    { name: 'ThirdImage',maxCount:1 },
    { name: 'FourthImage',maxCount:1 }
  ]),
  AddProduct
);

router.get('/getproducts',VerifyToken ,GetAllProducts);
router.delete('/delproduct/:_Id',VerifyToken,DeleteProductById)
router.get('/getbestsellerproducts',VerifyToken,Getbestsellerproducts)
router.get('/getsingleproduct/:_Id',VerifyToken,GetSingleProduct)


module.exports = router;
