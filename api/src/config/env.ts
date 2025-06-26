import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")
}
export const MONGODB_URL = process.env.MONGODB_URL as string;
    if(!MONGODB_URL){
        throw new Error("MONGODB_URL is not defined in .env")
    }