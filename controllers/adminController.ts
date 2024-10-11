import { Request,Response } from "express"
import mongoose from "mongoose"

const User=require('../model/user')
const getDashboard=async(req:Request,res:Response)=>{
   const users=await User.find()
    res.render('admindashboard',{users,searchterm:''})
}
const getUserAdd=async(req:Request,res:Response)=>{
    res.render('adminadduser')
}
interface userData{
    name:string,
    email:string,
    phone:string,
    password:string
}
const postUser=async (req:Request<{},{},userData>,res:Response)=>{
    try{
        const {name,email,phone,password}=req.body
        console.log('name',name,email,phone,password)
        const user=await User.findOne({email:email})
        if(user){
            return res.json({message:'user is already exists'})
        }
        const newUser= new User({
            email:email,
            password:password,
            name:name,
            phone:phone
        })
        await  newUser.save()
        if(!newUser){
            res.status(404).json({message:'error occured during add user'})
        }
        console.log('this is after')
        res.json({message:'user has added'})
    }catch(err){
        console.log('error occured',err)
    }
}
const deletUser=async(req:Request,res:Response)=>{
    try{
        const {userId}=req.body

        const data=await User.findByIdAndDelete(userId)
        if(data){
            res.json({message:'deleted successfully'})
        }
    }catch(err){
        console.log('error has occured',err)
    }
}
const getEdit=async (req:Request,res:Request)=>{
    try{

    }catch(err){
        console.log(err)
    }
}
module.exports={
    getDashboard,
    getUserAdd,
    postUser,
    deletUser
}