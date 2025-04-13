const dotenv=require('dotenv');
dotenv.config();

const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
const userRoutes=require('./routes/user.routes');


app.get('/',(req,res)=>{
    res.send("hello world");
});
app.use(express.json());//this will parse the json data from the request body
app.use(express.urlencoded({extended:true}));//this will parse the urlencoded data from the request body
app.use('/users',userRoutes);//this will use the user routes for the api
module.exports=app;