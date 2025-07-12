const express = require('express');
const VerifyToken=require('../../Middleware/AdminAuthUser.js')
const {fetchAdminUserById} = require('../../Controller/Admin/FetchAdminController.js');
const router = express.Router();

router.get('/getAdminuserdetails/:Email',VerifyToken,fetchAdminUserById)

module.exports = router;
