import express from "express"
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { userRouter } from "./routes/user.routes";
import { connectDB } from "./config/db";
import cors from "cors"
import dotenv from 'dotenv';
import { FRONTEND_URL, CLERK_SECRET_KEY } from "./config/env";
dotenv.config();

const app= express();
app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true,  
}))
const PORT = 3000 
connectDB()
app.use(express.json());
app.use(ClerkExpressWithAuth({CLERK_SECRET_KEY}));

app.get("/", (req, res)=>{
    res.json("hello world !!")
})
app.use("/api/user", userRouter)

app.listen(PORT, ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})