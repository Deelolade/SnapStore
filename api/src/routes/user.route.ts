import express  from "express";
import { clerkUserAuth, updateUserProfile } from "../controllers/user.controller";
import { requireAuth } from "@clerk/clerk-sdk-node";
import { upload } from "../utils/multer";

export const userRouter = express.Router();

userRouter.post("/sync", requireAuth(clerkUserAuth))
userRouter.put("/profile", upload.single('profilePicture'),requireAuth(updateUserProfile))

