import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/util.js"


export const login = async (req,res) =>{
    const {email,fullName,password} = req.body
    try {
        if(password.length<6) return res.status(400).json({message:"The password must be greater than 6 characters"})
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const ispassword = await bcrypt.compare(password,user.password)
        if(!ispassword) return res.status(400).json({message:"Invalid credentials"})

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            password:user.password
        })
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout = async (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Loged out Succesfully"})
    } catch (error) {
        console.log("Error in logout controller ",error.message)
        res.status(500).json({message:"Internal server error"})        
    }
}

export const check = async (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}