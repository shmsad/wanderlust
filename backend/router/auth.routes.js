const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const authModel = require('../schema/auth.model');
const jwt = require('jsonwebtoken');
const isVerifyUser = require('../middleware/isVerifyUser');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;




//create sign up
router.post('/signup', async(req,res)=>{
    const {name, email, password, term_condition} = req.body;
    try {
        let user = await authModel.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        user = await authModel.create({
            name,
            email,
            password:hashPass,
            term_condition,
        });
        res.send({
            success: true,
            message: "account created successfully",
            auth: user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
});

// create login
router.post('/login', async(req,res)=>{
    const {email, password} = req.body 
    let user = await authModel.findOne({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid email or password", 
        })
    }
    const isVerifyPass = await bcrypt.compare(password, user.password);
    // console.log(isVerifyPass)
    if(!isVerifyPass){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password"
        })
    }
    let token = jwt.sign({id:user._id},secretKey);
    res.send({
        success: true,
        message: "Login successfully",
        user,
        token,
    });
    //create token
    // const seckey = ("wanderlust") /*here secret key is define by you*/
    // let token = jwt.sign({id:user._id},seckey)
    /*after printing the token you:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzZiZDI5YWU2YjNjOGIwNzg0MGEwNiIsImlhdCI6MTc1MjY3MDc5OX0.Z4aaN_c3EQDHt2_ljZjJ13EWB7itcZgEi1PHTS23lNM
    :-:1.first part is "header"-: this is an algorithms to generate token
    :-:2.second part is "payload"-: this clint side iformation(data of user)
    :-:3.third part is "signiture"-: this is use for "comparison secret ky with token"
    console.log(token)
    console.log(token.length)
    console.log(token.split('.')[2].length)
    */

})

// /*// ceate getuser, with middleware
// // (req,res, next)=>{
//     let token = req.header('auth_token')
//     /*console.log(token)
//     res.send({
//         success:true,
//         message:"gitting token successfully"
//     }) */
//     // const seckey = ("wanderlust")
//     if(!token){
//         return res.status(401).send({
//             success:false,
//             message: "please authenticate"
//         })
//     }
//     let tokenUser = jwt.verify(token,seckey)     
//     console.log() 
//     res.send({
//         success:true,
//         message:"token verify"
//     })
// }*/
router.get('/getuser', isVerifyUser, async(req,res)=>{
    try {
        let auth = await authModel.findById(req.user);
        res.send({
            success: true,
            message: "user found",
            user: auth,
    });
    } catch (error) {
        res.send({
            success: false,
            message: "internal server error"
        })
    }
});

router.put('/update/profile', async(req,res)=>{})

router.delete('/delete', isVerifyUser, async(req,res)=>{
    try {
        const auth = await authModel.findByIdAndDelete(req.user);
        res.send({
            success: true,
            message:"user deleted",
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: "Error deleting user"
        });
    }
});

module.exports = router;