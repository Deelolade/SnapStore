import mongoose from "mongoose";
import { MONGODB_URL } from "./env";

export const connectDB = async()=>{
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("Connected to mongodb..")
    } catch (error) {
        console.log("error connecting to mongodb:", error)
        process.exit(1);
    }
}