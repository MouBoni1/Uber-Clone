const dotenv=require('dotenv');
dotenv.config();

const express=require('express');
const cors=require('cors');
const app=express();
const cookieParser=require('cookie-parser');

const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');

app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");
});
app.use(express.json());//this will parse the json data from the request body
app.use(express.urlencoded({extended:true}));//this will parse the urlencoded data from the request body
app.use('/users',userRoutes);//this will use the user routes for the api
app.use('/captains',captainRoutes);//this will use the captain routes for the api
app.use(cookieParser());//this will parse the cookies from the request
module.exports=app;