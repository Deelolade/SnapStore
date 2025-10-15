"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const productSchema = new mongoose_1.default.Schema({
    sellerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
    },
    image: {
        type: [String],
    },
    slug: {
        type: String,
        unique: true,
    },
    socialMedia: {
        type: [String], // array of platform names like ["whatsapp", "instagram"]
        set: (data) => {
            return Array.isArray(data) ? data : [data];
        }
    }
}, { timestamps: true });
productSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
exports.Product = mongoose_1.default.model("Product", productSchema);
