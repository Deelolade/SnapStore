"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.CLERK_SECRET_KEY = exports.FRONTEND_URL = exports.MONGODB_URL = exports.JWT_SECRET = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.JWT_SECRET = process.env.JWT_SECRET;
if (!exports.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
exports.MONGODB_URL = process.env.MONGODB_URL;
if (!exports.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in .env");
}
exports.FRONTEND_URL = process.env.FRONTEND_URL;
if (!exports.FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined in .env");
}
exports.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
if (!exports.CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is not defined in .env");
}
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
if (!exports.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_CLOUD_NAME is not defined in .env");
}
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
if (!exports.CLOUDINARY_API_KEY) {
    throw new Error("CLOUDINARY_API_KEY is not defined in .env");
}
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
if (!exports.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is not defined in .env");
}
