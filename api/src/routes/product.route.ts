import express from "express"
import { createProduct } from "../controllers/product.controller";



export const  productRouter = express.Router();

productRouter.post("/", createProduct)


