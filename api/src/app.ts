import express from "express"
import { userRouter } from "./routes/user.route";
import { clerkMiddleware } from "@clerk/express";
import { productRouter } from "./routes/product.route"
import { connectDB } from "./config/db";
import cors from "cors"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import { FRONTEND_URL } from "./config/env";
import { storeRouter } from "./routes/store.route";

dotenv.config();

const app= express();
app.use(cookieParser())
app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true,  
}))
const PORT = 3000 
connectDB()
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res)=>{
    res.json("hello world !!")
})
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/store", storeRouter)

app.listen(PORT, ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})