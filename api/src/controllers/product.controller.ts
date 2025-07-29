import {  Request ,Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { AuthenticatedRequest } from "../utils/authMiddleware";
import { User } from "../models/user.model";

export const getProducts = async(req:AuthenticatedRequest, res:Response, next:NextFunction)=>{

}

export const createProduct = async(req: AuthenticatedRequest, res:Response, next:NextFunction)=>{

    
    try {    
    // const sellerId = req.user?._id;
    // if (!sellerId){
    //     return res.status(401).json({message:"Unauthorized !. Seller not found"})
    // }
    const { title, price, description, image, sellerId} = req.body

    const newProduct = new Product({
        title, price, description, image, sellerId 
    })
     await newProduct.save();
     res.status(200).json({message:"product created succesfully", newProduct})
     console.log(newProduct)
   } catch (error) {
    return next(error)
   }

}