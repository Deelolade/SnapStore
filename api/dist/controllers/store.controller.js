"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerStore = void 0;
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const getSellerStore = async (req, res, next) => {
    try {
        const { storeSlug } = req.params;
        const seller = await user_model_1.User.findOne({ storeSlug }).select("-password");
        if (!seller) {
            res.status(404).json({ message: "Seller details not found" });
            return;
        }
        const products = await product_model_1.Product.find({ sellerId: seller._id });
        res.status(200).json({
            success: true,
            seller,
            products
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSellerStore = getSellerStore;
