import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { AuthenticatedRequest } from "../utils/authMiddleware";
import { User } from "../models/user.model";
import cloudinary, { uploadImages } from "../utils/cloudinary";


export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {slug, sellerId} = req.params;
        const products = await Product.find({sellerId});
        
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error);
    }
}


export const deleteProducts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("new item",req.params)
    const {  id:productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
              success: false,
              message: "Product not found",
            });
          }
      
        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        next(error);
    }
}

export const createProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
    console.log("BODY:", req.body);       // should now have title, description, etc.
  console.log("FILES:", req.files); 
//   const sellerId = req.user; 
    try {
        const user = await User.findOne({ clerkId: req.user });
    if (!user) return res.status(404).json({ message: "User not found" });

        const { title, description, price, category, socialMedia} = req.body;
    
        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
          return res.status(400).json({ error: "No images uploaded" });
        }
    
        const imageUrls = await uploadImages(req.files as Express.Multer.File[]);
    
        // Create and save product
        const newProduct = await Product.create({
          title,
          description,
          price,
          category,
          sellerId :user._id,
          image:imageUrls,
          socialMedia 
        });
    
        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Server error creating product" });
      }
}



export const getMyProducts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const clerkUserId = req.user; // This is the Clerk user ID
        
        if (!clerkUserId) {
            res.status(401).json({ message: "Unauthorized !. Seller not found" });
            return;
        }
        
        // Find the user in your database using the Clerk ID
        const user = await User.findOne({ clerkId: clerkUserId });
        if (!user) {
            res.status(404).json({ message: "User not found in database" });
            return;
        }
        
        // Use the database user ID for the product query
        const products = await Product.find({ sellerId: user._id });
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error)
    }
}