import express from "express"
import { createProduct, createProductClicks, createProductView, deleteProducts, getMyProducts, getProductViews,  } from "../controllers/product.controller";
import { authenticate } from "../utils/authMiddleware";
import { upload } from "../utils/multer";



export const  productRouter = express.Router();

productRouter.delete("/:id", authenticate, deleteProducts)
productRouter.post("/images", authenticate,  upload.array("images", 5), createProduct)
productRouter.get("/me", authenticate, getMyProducts)
productRouter.post('/:productId/view', createProductView)
productRouter.get('/:productId/view', authenticate, getProductViews)
productRouter.post('/:productId/click', createProductClicks)

