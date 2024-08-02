 const express = require("express");
 const router = express.Router();

 const {login,signup} = require('../Controller/Auth');
 const {auth, isAdmin, isStudent} = require('../middleware/auth')

 router.post('/login', login);
 router.post('/signup', signup);

 //testing routes
 router.get('/test', auth, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to the protected route for Tests."
    })
 })

 //protected routes
 router.get('/Student', auth,isStudent, (req,res)=>{
     res.json({
        success: true,
        message:"Welcome to the protected route for the student."
     });
 })


 router.get('/isAdmin', auth,isAdmin, (req,res)=>{
     res.json({
        success: true,
        message: "Welcome to the protected route for the Admin."
     });
 })


 module.exports= router;