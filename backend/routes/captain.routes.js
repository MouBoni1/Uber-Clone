const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controller');
const authMiddleware=require('../middlewares/auth.middleware');


router.post('/register',[
    body('fullname.firstname').notEmpty().withMessage('First name is required').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please fill a valid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Color is required').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').notEmpty().withMessage('Plate number is required').isLength({min:3}).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').notEmpty().withMessage('Capacity is required').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required').isIn(['car','bike','auto']).withMessage('Vehicle type must be car, bike or auto')
],
 captainController.registerCaptain);//this will register the captain and send the response to the frontend

router.post('/login',[
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please fill a valid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
 captainController.loginCaptain);//this will login the captain and send the response to the frontend

 router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
 
 router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)//this will logout the captain and send the response to the frontend
module.exports=router;
