import jwt from "jsonwebtoken"
import {  Request ,Response, NextFunction } from "express";
import { UserDocument, User } from "../models/user.model";
import { JWT_SECRET } from "../config/env";


export interface AuthenticatedRequest extends Request {
    user?: UserDocument; 
  }

export const authenticate = async (req:AuthenticatedRequest, res:Response, next: NextFunction)=>{

    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({message:" Access denied: invalid or expired token."});

    try {
            const decoded : any = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id);
            if(!user){
               return  res.status(401).json({message:" User not found !"})
            }
                req.user = user;
                next()
    } catch (error) {
        res.status(401).json({message: 'Invalid token'})
    }
}