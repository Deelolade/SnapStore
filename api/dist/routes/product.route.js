"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const authMiddleware_1 = require("../utils/authMiddleware");
const multer_1 = require("../utils/multer");
exports.productRouter = express_1.default.Router();
exports.productRouter.delete("/:id", authMiddleware_1.authenticate, product_controller_1.deleteProducts);
exports.productRouter.post("/images", authMiddleware_1.authenticate, multer_1.upload.array("images", 5), product_controller_1.createProduct);
exports.productRouter.get("/me", authMiddleware_1.authenticate, product_controller_1.getMyProducts);
exports.productRouter.get("/allstats", authMiddleware_1.authenticate, product_controller_1.getMyProductsAnalytics);
exports.productRouter.get('/:productId/stats', authMiddleware_1.authenticate, product_controller_1.getProductStats);
//unathenticated user functionalities 
exports.productRouter.post('/:productId/view', product_controller_1.createProductView);
exports.productRouter.post('/:productId/click', product_controller_1.createProductClicks);
