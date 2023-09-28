const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserRouter, UserModel} = require("../model/User.model");


const userRouter = express.Router();

userRouter.post("/register" , async(req,res)=>{
    const {username ,avatar, email,password} = req.body;
    try {
        const existUser = await UserModel.find({email});
        if(existUser){
            res.send("user already registered!!")
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new UserModel({email , username , password : hashedPassword , avatar})
        await user.save();

        const token = jwt.sign({email:user.email , id:user._id},"asif");
        res.send({"msg":"user registered!!" , "token":token})
        
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login" , async(req,res)=>{
    const {email,password} = req.body;
    try {
        const existUser = await UserModel.find({email});
        if(!existUser){
            res.send("user not found!!")
        }
        const reHashedPassword = await bcrypt.compare(password,existUser.password);
        if(!reHashedPassword){
            res.send("invalid credentials!!")
        }
        

        const token = jwt.sign({email:existUser.email , id:existUser._id},"asif");
        res.send({"msg":"Login successfull!!" , "token":token})
        
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRouter
}