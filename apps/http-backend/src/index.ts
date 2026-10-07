import express from "express";
import {jwt} from 'jsonwebtoken';
import JWT_SECRET from '@repo/backendcommon/config'
import authmiddleware from "./middleware/authmiddleware.js";
const app=express();
app.post('/signup',(req,res)=>{
    const {username,password,email}=req.body;
    if(!username || !password || !email){
        res.send("enter the crediantials");
        return
    }
    else{
        // push data into db
    }
})
app.post('/signin',(req,res)=>{
// find the user in db
//if find then return its user id
const user_id="234"
const token=jwt.sign(user_id,"jwtsecret")
res.status(201).json({
    token,
    msg:"signUp succesfully"
})  
})
app.post('/create_room',authmiddleware,(req,res)=>{
        
})
app.listen(3002,()=>{
    console.log("server is running")
})