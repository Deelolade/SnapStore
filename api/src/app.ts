import express from "express"
import { userRouter } from "./routes/user.routes";
import { connectDB } from "./config/db";

const app= express();
const PORT = 3000 
app.use(express.json());

connectDB()
app.get("/", (req, res)=>{
    res.json("hello world !!")
})
app.use("/api/user",userRouter)

app.listen(PORT, ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})