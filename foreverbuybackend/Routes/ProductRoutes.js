const express=require('express')
const router=express.Router();

const {AddProduct,GetAllProducts}=require('../Controller/ProductController')

router.post('/addproduct',AddProduct);
router.get('/getproducts',GetAllProducts);

module.exports=router;