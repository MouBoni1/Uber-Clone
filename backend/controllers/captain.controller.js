const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);//if there are any validation errors, it will be stored in the errors array
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}
module.exports.loginCaptain = async (req, res, next) => {
    
        const errors = validationResult(req);//if there are any validation errors, it will be stored in the errors array
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { email, password } = req.body;
    
        const captain = await captainModel.findOne({ email }).select('+password');//this will find the captain in the database and select the password field as well
    
        if (!captain) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordMatched = await captain.comparePassword(password, captain.password);
    
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const token = captain.generateAuthToken();
        res.cookie('token', token); // Set the token in a cookie 
    
        res.status(200).json({ token, captain });
}
module.exports.getCaptainProfile = async(req,res) =>{
    res.status(200).json({captain:req.captain});
}
module.exports.logoutCaptain = async (req, res) => {

    const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1]; // This will get the token from the cookies or Authorization header
     await blacklistTokenModel.create({token});

    res.clearCookie('token');//this will clear the cookie and send the response to the frontend
    res.status(200).json({message:'Logout successfully'});
}