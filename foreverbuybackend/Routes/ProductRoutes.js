// routes/ProductRoutes.js
const express = require('express');
const upload = require('../Config/MulterConfig');
const { AddProduct, GetAllProducts,DeleteProductById } = require('../Controller/ProductController');

const router = express.Router();

router.post(
  '/addproduct',
  upload.fields([
    { name: 'FirstImage' },
    { name: 'SecondImage' },
    { name: 'ThirdImage' },
    { name: 'FourthImage' }
  ]),
  AddProduct
);

router.get('/getproducts', GetAllProducts);
router.delete('/delproduct/:_Id',DeleteProductById)

module.exports = router;
