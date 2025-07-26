import express  from "express";
import { userAuth } from "../controllers/user.controller";
import { requireAuth } from "@clerk/clerk-sdk-node";

export const userRouter = express.Router();

userRouter.post("/sync", requireAuth(userAuth))