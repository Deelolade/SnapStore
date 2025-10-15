"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadImages = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../config/env");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: env_1.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.CLOUDINARY_API_KEY,
    api_secret: env_1.CLOUDINARY_API_SECRET
});
const uploadImages = async (files) => {
    const uploads = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ folder: "snapstore" }, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result?.secure_url);
            }).end(file.buffer);
        });
    });
    return Promise.all(uploads);
};
exports.uploadImages = uploadImages;
const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'profile_pics' }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result?.secure_url || '');
        });
        streamifier_1.default.createReadStream(file.buffer).pipe(stream);
    });
};
exports.uploadImage = uploadImage;
exports.default = cloudinary_1.v2;
