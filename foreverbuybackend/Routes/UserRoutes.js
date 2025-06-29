const express=require('express')
const {UserRegister,Login}=require('../Controller/UserController.js');
const router=express.Router();
router.post('/AddUser',UserRegister)
router.post('/Login',Login)

module.exports=router;