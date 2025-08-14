import express from "express"
import { createProduct, createProductClicks, createProductView, deleteProducts, getMyProducts, getProductStats,  } from "../controllers/product.controller";
import { authenticate } from "../utils/authMiddleware";
import { upload } from "../utils/multer";



export const  productRouter = express.Router();

productRouter.delete("/:id", authenticate, deleteProducts)
productRouter.post("/images", authenticate,  upload.array("images", 5), createProduct)
productRouter.get("/me", authenticate, getMyProducts)
productRouter.get('/:productId/stats', authenticate, getProductStats)

//unathenticated user functionalities 
productRouter.post('/:productId/view', createProductView)
productRouter.post('/:productId/click', createProductClicks)

