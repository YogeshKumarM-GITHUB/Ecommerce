require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const prodroutes=require('./Routes/ProductRoutes')
const userroutes=require('./Routes/UserRoutes.js');
const userdetailsroutes=require('./Routes/UserInfoRoute.js')
const placeorder=require('./Routes/PlaceOrderRoute.js')
const AdminLogin=require('./Routes/Admin/AdminUserRoutes.js')
const AdminInfo=require('./Routes/Admin/AdminInfoRoutes.js')
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
const MongoDBURL=process.env.MONGDODBURL;
const PORT=process.env.PORT|| 5000;


mongoose.connect(MongoDBURL, {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 20000,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  process.exit(1); // optional exit
});
app.get('/',(req,res)=>{
    res.send("started server")
})
app.use('/api',prodroutes);
app.use('/api/user',userroutes);
app.use('/api/userdetails',userdetailsroutes)
app.use('/api/placeorder',placeorder);
app.use('/api/admin',AdminLogin);
app.use('/api/Adminuserdetails',AdminInfo)
app.listen(PORT,()=>console.log("server started"));

module.exports=app;