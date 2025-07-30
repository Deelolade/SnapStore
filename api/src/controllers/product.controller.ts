import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { AuthenticatedRequest } from "../utils/authMiddleware";
import { User } from "../models/user.model";

export const getProducts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

}

export const createProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    try {
        // const sellerId = req.user?._id;
        // if (!sellerId){
        //     return res.status(401).json({message:"Unauthorized !. Seller not found"})
        // }
        const { title, price, description, image, sellerId } = req.body

        const newProduct = new Product({
            title, price, description, image, sellerId
        })
        await newProduct.save();
        res.status(200).json({ message: "product created succesfully", newProduct })
        console.log(newProduct)
    } catch (error) {
        return next(error)
    }

}

export const getMyProducts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const clerkUserId = req.user; // This is the Clerk user ID
        console.log("Clerk user ID:", clerkUserId);
        
        if (!clerkUserId) return res.status(401).json({ message: "Unauthorized !. Seller not found" })
        
        // Find the user in your database using the Clerk ID
        const user = await User.findOne({ clerkId: clerkUserId });
        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }
        
        // Use the database user ID for the product query
        const products = await Product.find({ sellerId: user._id });
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        next(error)
    }

}