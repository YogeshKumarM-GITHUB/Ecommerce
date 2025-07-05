const user=require('../Model/User.js')


const fetchUserById=async(req,res)=>{
  try{
          const {Email}=req.params;
 

          if(!Email){
            return res.status(400).json({
                success:false,
                message:"UserId is empty"
            })
          }

          const userdetails=await user.find({Email:Email});
          console.log(userdetails)
          if(userdetails){
            return res.status(200).json({
                success:true,
                message:"User data fetched successfully.",
                data:userdetails
            })
          }else{
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
          }

  }
  catch(error){
    res.status(400).json({
        success:false,
        message:error.message
    })
  }
}

module.exports={fetchUserById};