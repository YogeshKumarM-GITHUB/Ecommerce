const User=require('../Model/User.js');
const brcypt=require('bcrypt');
const jsonweb=require('jsonwebtoken')
require('dotenv').config();


const UserRegister=async (req,res)=>{
    try{
           const {UserName,Email,Password}=req.body;
           if(!UserName || !Email || !Password){
             return res.status(400).json({
                success:false,
                message:"Invalid Input"
              })
           }

          const IsEmailAvailable=await User.findOne({Email});
          if(IsEmailAvailable){
           return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
          }

           const hashPassword=await brcypt.hash(Password,10);

           const newuser=new User({
                UserName,
                Email,
                Password:hashPassword
           });

           await newuser.save();
            return res.status(201).json({
               success:true,
               message:"User Created successfully",
               data:newuser
           })
         
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


const Login=async(req,res)=>{
    try{
            const {Email,Password}=req.body;
           //  console.log(Email,Password)
            if(!Email || !Password){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Input"
                })
            }

            const IsEmailAvail=await User.findOne({Email});
            if(!IsEmailAvail){
              return  res.status(400).json({
                    success:false,
                    message:"Invalid Email"
                })
            }

          const CompPassword=await brcypt.compare(Password,IsEmailAvail.Password);
          if(!CompPassword){
            return res.status(401).json({
                success:false,
                message:"Inavlid Password"
            })
          }

          const token=jsonweb.sign({id:IsEmailAvail._id,UserName:IsEmailAvail.UserName,Email:IsEmailAvail.Email},process.env.SECRETKEY,{expiresIn:'1h'});

          return res.json({
            token,
            data:IsEmailAvail
          })


    }
    catch(error){
        return res.json(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports={UserRegister,Login};