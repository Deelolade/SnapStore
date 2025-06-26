import express  from "express";
import { signUp } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/signup", signUp)