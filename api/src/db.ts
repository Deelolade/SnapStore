import { error } from "console";
import { config } from "dotenv";
import mongoose, { Error } from "mongoose";
config()
export const connectDB = async()=>{
    const mongodbUrl = process.env.MONGODB_URL
    if(!mongodbUrl){
        throw new Error("MONGODB_URL is not defined in .env")
    }
    try {
        await mongoose.connect(mongodbUrl)
        console.log("Connected to mongodb..")
    } catch (error) {
        console.log("error connecting to mongodb:", error)
    }
}