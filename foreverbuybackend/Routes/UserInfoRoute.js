const express = require('express');
const VerifyToken=require('../Middleware/AuthUser.js')
const {fetchUserById} = require('../Controller/FetchUserController.js');
const router = express.Router();

router.get('/getuserdetails/:Email',VerifyToken,fetchUserById)

module.exports = router;
