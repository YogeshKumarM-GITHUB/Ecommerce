require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const prodroutes=require('./Routes/ProductRoutes')

app.use(cors());
app.use(express.json());
const MongoDBURL=process.env.MONGDODBURL;
const PORT=process.env.PORT|| 5000;


mongoose.connect(MongoDBURL).then(()=>console.log('mongdodbconnected')).catch(err=>console.log(err));
app.get('/',(req,res)=>{
    res.send("started server")
})
app.use('/api',prodroutes);
app.listen(PORT,()=>console.log("server started"));