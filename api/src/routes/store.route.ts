import express from "express"
import { getSellerStore } from "../controllers/store.controller";



export const  storeRouter = express.Router();

storeRouter.get("/:storeSlug", getSellerStore)


