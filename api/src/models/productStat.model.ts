import mongoose from "mongoose";


export interface ProductViewDocument extends Document{
    productId: string,
    ipAddress: string,
    createdAt?: Date
} 

const productStatSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId, 
        ref: "Product",
        required: true
    },
    
    ipAddress:{
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:86400,
    }
})
export const ProductView = mongoose.model<ProductViewDocument>("ProductView", productStatSchema)
export const ProductClick = mongoose.model<ProductViewDocument>("ProductClick", productStatSchema)