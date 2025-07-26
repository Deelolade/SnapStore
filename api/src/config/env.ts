import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
}
export const MONGODB_URL = process.env.MONGODB_URL as string;
if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in .env")
}
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
if (!FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined in .env")
}
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY as string;
if (!CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is not defined in .env")
}