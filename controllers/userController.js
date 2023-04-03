import User from "../model/User.js";
import bcrypt from 'bcrypt'

 export  const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();

    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({messgae:" o users Found"});

    }
    return res.status(200).json({users});
}

export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;


    let existingUser;
    try{

    existingUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }if(existingUser){
        return res.status(400).json({message:"User already Exist"})
    }
    const user=new User({
        name,email,password,
        blos:[]
    });

    
    try{
      await  user.save();
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({user})
}



export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
        return console.log(err);

    }if(!existingUser){
        return res
        .status(400).json({message:"User not found"})
    }

    const isPasswordCorrect=(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect Password"})
    }
    return res.status(200).json({message:"Login Succesfull",user:existingUser})

}
