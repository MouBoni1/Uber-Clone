const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const blacklistTokenModel=require('../models/blacklistToken.model');

//this middleware will check if we have authorized user
//or not i.e. if a user has token that means he is authorized
module.exports.authUser = async (req, res, next) => {
    // const token =
    //     (req.cookies && req.cookies.token) || 
    //     (req.headers.authorization && req.headers.authorization.split(' ')[1]); // Safely access token
    const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1]
    // const token=req.cookies.token||req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }); // If no token is found
    }
    const isBlackListed=await blacklistTokenModel.findOne({token});//this will check if the token is blacklisted or not
    if(isBlackListed){
        return res.status(401).json({message:'Unauthorized'});//if the token is blacklisted, it will send this message to the frontend
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await userModel.findById(decoded._id); // Find the user by ID
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' }); // If user is not found
        }
        req.user = user; // Attach user to the request object
        return next(); // Proceed to the next middleware or controller
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' }); // Handle token verification errors
    }
};
          


