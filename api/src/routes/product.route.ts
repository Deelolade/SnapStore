import express from "express"
import { createProduct, getMyProducts } from "../controllers/product.controller";
import { authenticate } from "../utils/authMiddleware";



export const  productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/me", authenticate, getMyProducts)


