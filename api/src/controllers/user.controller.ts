import { Request,Response } from "express";
import bcryptjs from "bcryptjs"
import { User } from "../models/user.model";

export const signUp = async (req: Request, res: Response) =>{
    try {
        const { name, email, password} = req.body;

    if(!name|| !email || !password ||name === "" || email === "" || password ===""){
        return res.status(400).json({success: false,
            message: "All fields are required"
        })
    }
    
    //check for existing user
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            success:false,
            message: "User Account already existed!"
        })
    }

    // hash user passwords
    const hashedPassword = bcryptjs.hashSync(password, 12)
    console.log("hashedpassword:", hashedPassword)

    //create new user
    const newUser = new User ({
        name,
        email,
        password: hashedPassword,
    })

    // save new user data
    await newUser.save();
    res.status(201).json({
        success: true,
        message: "User's Profile created successfully !"
    })
    } catch (error) {
        console.log(error)
       res.status(500).json({
        success: false,
        message:"Unable to create user's profile !"
    }) 
    }
}   