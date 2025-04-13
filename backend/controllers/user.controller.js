const userModel=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');

module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);//if there are any errors in the validation, it will be stored in the errors variable
    if(!errors.isEmpty()){////if there are any errors in the validation, it will be true
        return res.status(400).json({errors:errors.array()});
    }
    //if there are no errors in the validation, it will take the data from the request body and store it in the user variable
    const {fullname,email,password}=req.body;
    //now we require hashed password
    const hashedPassword=await userModel.hashPassword(password);
    //now we require the user to be created
    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });
    const token=user.generateAuthToken();//this will generate the jwt token for the user
    res.status(201).json({user,token});//this will send the user and the token to the frontend

}
module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req);//if there are any errors in the validation, it will be stored in the errors variable
    if(!errors.isEmpty()){////if there are any errors in the validation, it will be true
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    //now we require the user to be found in the database 
    const user=await userModel.findOne({email}).select('+password');//this will find the user in the database and select the password field as well 
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});//if the user is not found, it will send this message to the frontend
    }
    const isMatch=await user.comparePassword(password,user.password);//this will compare the password entered by the user with the password stored in the database
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token=user.generateAuthToken();
    res.status(200).json({user,token});//this will send the user and the token to the frontend

}