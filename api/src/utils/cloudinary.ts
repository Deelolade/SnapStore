import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/env';
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

 export const uploadImages = async (files: Express.Multer.File[]) => {
  const uploads = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "snapstore" }, (err, result) => {
        if (err) return reject(err);
        resolve(result?.secure_url);
      }).end(file.buffer);
    });
  });

  return Promise.all(uploads);
};
export const uploadImage = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profile_pics' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


export default cloudinary