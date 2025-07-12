require('dotenv').config();
const jsweb=require('jsonwebtoken')
const user=require('../Model/Admin/Admin.js');
function VerifyToken(req,res,next){
    const authHeader=req.headers['authorization'];
    if(!authHeader){
        return res.sendStatus(401);
    }
    const token=authHeader.split(' ')[1];
    jsweb.verify(token,process.env.SECRETKEY,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    })

}

module.exports=VerifyToken;