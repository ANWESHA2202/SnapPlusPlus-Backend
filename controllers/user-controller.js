import User from "../models/User";
import bcrypt from "bcryptjs";

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    let mailExist,usernameExist;
    try{
        usernameExist=await User.findOne({username:username});
        mailExist=await User.findOne({email:email});
    }catch(err){
        return res.status(500).json([{message:err.message}]);
    }
    if(usernameExist && !mailExist){
        return res.status(400).json([{message:"Username already exists"}]);
    }
    else if(usernameExist || mailExist){
        return res.status(400).json([{message:"Username or email already exists"}]);
    }
    if(!username || !email || !password){
        return res.status(400).json([{message:"All fields are required"}]);
    }
    if(password.length<6){
        return res.status(400).json([{message:"Password must be atleast 6 characters long"}]);
    }

    const user=new User({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,10),
    });

    try{
        await user.save();    
    }
    catch(err){ 
        return res.status(500).json([{message:err.message}]);
    }

    return res.status(201).json([{message:"User created successfully",user:user}]);
}



