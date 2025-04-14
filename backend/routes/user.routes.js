const express=require('express');
const {body}=require('express-validator');
const router=express.Router();
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');



router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),//if the msg is invalid, it will be shown in the response
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
],//if we get an error in the validation it will go to the controller
userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),//if the msg is invalid, it will be shown in the response
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
],//if we get an error in the validation it will go to the controller
userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);//this will logout the user by clearing the cookie and sending the response to the frontend



module.exports=router;