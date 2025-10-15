import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

export const getSellerStore: RequestHandler = async (req, res, next) => {
    try {
        const { storeSlug } = req.params;

        const seller = await User.findOne({ storeSlug }).select("-password");
        if (!seller) {
            res.status(404).json({ message: "Seller details not found" });
            return;
        }

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
