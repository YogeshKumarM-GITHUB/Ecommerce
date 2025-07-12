const express=require('express')
const {AdminRegister,Login}=require('../../Controller/Admin/AdminController.js');
const router=express.Router();
router.post('/AddUser',AdminRegister)
router.post('/Login',Login)

module.exports=router;