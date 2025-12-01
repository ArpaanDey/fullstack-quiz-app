import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcryptjs'
import Jwt  from "jsonwebtoken";


const TOKEN_EXPIRES_IN = '24h';
const JWT_SECRET = 'your_jwt_secret_here';


export async function register(req,res){
    try {
        const{name,email,password}=req.body;
        if(!name|| !email||!password){
            return res.status(400).json({
                success:false,
                message:"all fields ar require",
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"invalid email"
            })
        }

        const exists = await User.findOne({ email }).lean();
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    
    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: newId,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    if(!JWT_SECRET)throw new Error('jwt_secret is not found on server');
    const token = Jwt.sign({id:newId.toString()},JWT_SECRET,{expiresIn: TOKEN_EXPIRES_IN});

    return res.status(201).json({
        success:true,
        message:"account create successfuly",
        token,
        user:{id:user._id.toString(),name:user.name,email:user.email}
    });
} 
    catch (error) {
        console.log('reginster error',error);
        return res.status(500).json({
            success:false,
            message:"server error",
        });
    }
}

//login

export async function login(req,res){
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"all field ar required"
            })
        }

        const user= await User.findOne({email});

        if(!user)return res.status(401).json({
            success:false,
            message:"invalid email or password"
        })
    
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({
            success:false,
            message:"invalid password or email",
        });
        const token = Jwt.sign({id:user._id.toString()},JWT_SECRET,{expiresIn: TOKEN_EXPIRES_IN});

        return res.status(201).json({
            success:true,
            message:"login successfuly",
            token,
            user:{id:user._id.toString(),name:user.name,email:user.email}
        });
    
    } catch (error) {
        console.error('login error',error);
        return res.status(500).json({
            success:false,
            message:'server error',
        });
    }
}
