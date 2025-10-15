"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClick = exports.ProductView = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productStatSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.ProductView = mongoose_1.default.model("ProductView", productStatSchema);
exports.ProductClick = mongoose_1.default.model("ProductClick", productStatSchema);
