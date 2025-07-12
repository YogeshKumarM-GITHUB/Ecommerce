const mongoose=require('mongoose');

const AdminUserSchema=new mongoose.Schema({
   AdminUserName:{type:String,required:true},
   Email:{type:String,required:true,unique:true},
   Password:{type:String,required:true}
},{timestamps:true})

module.exports=mongoose.model("AdminUser",AdminUserSchema)

