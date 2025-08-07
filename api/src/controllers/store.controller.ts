import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

export const getSellerStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { storeSlug } = req.params;

        const seller = await User.findOne({ storeSlug }).select("-password");
        if (!seller) return res.status(404).json({ message: "Seller details not found" });

        const products = await Product.find({ sellerId: seller._id });

        res.status(200).json({
            success: true,
            seller,
            products
        });
    } catch (error) {
        next(error);
    }
};
