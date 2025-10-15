"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProductsAnalytics = exports.getProductStats = exports.createProductClicks = exports.createProductView = exports.getMyProducts = exports.createProduct = exports.deleteProducts = exports.getProducts = void 0;
const product_model_1 = require("../models/product.model");
const user_model_1 = require("../models/user.model");
const cloudinary_1 = require("../utils/cloudinary");
const productStat_model_1 = require("../models/productStat.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getProducts = async (req, res, next) => {
    try {
        const { slug, sellerId } = req.params;
        const products = await product_model_1.Product.find({ sellerId });
        res.status(200).json({
            success: true,
            products
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const deleteProducts = async (req, res, next) => {
    console.log("new item", req.params);
    const { id: productId } = req.params;
    if (!productId) {
        res.status(400).json({
            success: false,
            message: "Product ID is required",
        });
        return;
    }
    try {
        const deletedProduct = await product_model_1.Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        next(error);
    }
};
exports.deleteProducts = deleteProducts;
const createProduct = async (req, res, next) => {
    try {
        const user = await user_model_1.User.findOne({ clerkId: req.user });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const { title, description, price, category, socialMedia } = req.body;
        if (!req.files || req.files.length === 0) {
            res.status(400).json({ error: "No images uploaded" });
            return;
        }
        const imageUrls = await (0, cloudinary_1.uploadImages)(req.files);
        // Create and save product
        const newProduct = await product_model_1.Product.create({
            title,
            description,
            price,
            category,
            sellerId: user._id,
            image: imageUrls,
            socialMedia
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Server error creating product" });
    }
};
exports.createProduct = createProduct;
const getMyProducts = async (req, res, next) => {
    try {
        const clerkUserId = req.user; // This is the Clerk user ID
        if (!clerkUserId) {
            res.status(401).json({ message: "Unauthorized !. Seller not found" });
            return;
        }
        // Find the user in your database using the Clerk ID
        const user = await user_model_1.User.findOne({ clerkId: clerkUserId });
        if (!user) {
            res.status(404).json({ message: "User not found in database" });
            return;
        }
        // Use the database user ID for the product query
        const products = await product_model_1.Product.find({ sellerId: user._id });
        const productCount = products.length;
        // Get all product IDs
        const productIds = products.map(p => p._id);
        // Get total views for all products
        const productsWithViews = await Promise.all(products.map(async (product) => {
            const viewCount = await productStat_model_1.ProductView.countDocuments({ productId: product._id });
            const clickCount = await productStat_model_1.ProductClick.countDocuments({ productId: product._id });
            return {
                ...product.toObject(),
                viewCount,
                clickCount
            };
        }));
        res.status(200).json({
            success: true,
            products: productsWithViews,
            productCount,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyProducts = getMyProducts;
const createProductView = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const ipAddress = req.ip;
        if (!productId) {
            res.status(400).json({ success: false, message: "Product ID is required" });
            return;
        }
        const existingView = await productStat_model_1.ProductView.findOne({ productId, ipAddress });
        if (!existingView || Date.now() - existingView.createdAt.getTime() > 60 * 60 * 1000) {
            await productStat_model_1.ProductView.create({ productId, ipAddress });
            return;
        }
        const totalViews = await productStat_model_1.ProductView.countDocuments({ productId });
        res.status(200).json({
            sucess: true,
            views: totalViews
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductView = createProductView;
const createProductClicks = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const ipAddress = req.ip;
        if (!productId) {
            res.status(400).json({ success: false, message: "Product ID is required" });
            return;
        }
        const existingClick = await productStat_model_1.ProductClick.findOne({ productId, ipAddress });
        if (!existingClick || Date.now() - existingClick.createdAt.getTime() > 60 * 60 * 1000) {
            await productStat_model_1.ProductClick.create({ productId, ipAddress });
            return;
        }
        const totalClicks = await productStat_model_1.ProductClick.countDocuments({ productId });
        res.status(200).json({
            sucess: true,
            clicks: totalClicks
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductClicks = createProductClicks;
const getProductStats = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            res.status(400).json({ success: false, message: "Product ID is required" });
            return;
        }
        const product = await product_model_1.Product.findById(productId);
        const totalViews = await productStat_model_1.ProductView.countDocuments({
            productId: new mongoose_1.default.Types.ObjectId(productId)
        });
        const totalClicks = await productStat_model_1.ProductClick.countDocuments({
            productId: new mongoose_1.default.Types.ObjectId(productId)
        });
        res.status(200).json({
            sucess: true,
            product: product,
            views: totalViews,
            clicks: totalClicks
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductStats = getProductStats;
const getMyProductsAnalytics = async (req, res, next) => {
    try {
        const clerkUserId = req.user; // Clerk user ID
        if (!clerkUserId) {
            res.status(401).json({ message: "Unauthorized! Seller not found" });
            return;
        }
        // Number of days for analytics, default 7
        const days = parseInt(req.query.days) || 7;
        // Generate last X days in YYYY-MM-DD format
        const lastDays = Array.from({ length: days }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1 - i)); // chronological order
            return d.toISOString().slice(0, 10);
        });
        // Find seller in database
        const user = await user_model_1.User.findOne({ clerkId: clerkUserId });
        if (!user) {
            res.status(404).json({ message: "User not found in database" });
            return;
        }
        // Fetch all products for this seller
        const products = await product_model_1.Product.find({ sellerId: user._id })
            .lean() // convert Mongoose docs to plain objects
            .exec();
        // For each product, fetch daily views and clicks in the last X days
        const productsWithAnalytics = await Promise.all(products.map(async (prod) => {
            // Fetch daily views for this product
            const dailyViews = await productStat_model_1.ProductView.aggregate([
                { $match: { productId: prod._id, createdAt: { $gte: new Date(lastDays[0]) } } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Fetch daily clicks for this product
            const dailyClicks = await productStat_model_1.ProductClick.aggregate([
                { $match: { productId: prod._id, createdAt: { $gte: new Date(lastDays[0]) } } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Map over lastDays to create analytics array
            const analytics = lastDays.map((date) => {
                const views = dailyViews.find(v => v._id === date)?.count || 0;
                const clicks = dailyClicks.find(c => c._id === date)?.count || 0;
                return { date, views, clicks };
            });
            // Compute total views and clicks
            const viewCount = analytics.reduce((sum, a) => sum + a.views, 0);
            const clickCount = analytics.reduce((sum, a) => sum + a.clicks, 0);
            return {
                ...prod,
                dailyViews,
                dailyClicks,
                analytics,
                viewCount,
                clickCount,
            };
        }));
        res.status(200).json({
            success: true,
            products: productsWithAnalytics,
            days,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyProductsAnalytics = getMyProductsAnalytics;
