import express  from "express";
import { clerkUserAuth, updateUserProfile, updateUserProfileWithImage } from "../controllers/user.controller";
import { requireAuth } from "@clerk/clerk-sdk-node";
import { upload } from "../utils/multer";

export const userRouter = express.Router();

userRouter.post("/sync", requireAuth(clerkUserAuth))
userRouter.put("/profile", requireAuth(updateUserProfile))

// Handle profile update with image upload
userRouter.put("/profile-with-image", 
  upload.single('profilePicture'), 
  requireAuth(updateUserProfileWithImage)
)