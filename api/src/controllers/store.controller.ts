import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

export const getSellerStore = async (req: Request, res: Response) => {
    const { storeSlug } = req.params;
  
    const seller = await User.findOne({ storeSlug });
    if (!seller) return res.status(404).json({ message: "Seller not found" });
  
    const products = await Product.find({ sellerId: seller._id });
  
    res.json({ seller, products });
};