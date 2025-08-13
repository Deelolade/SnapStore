import mongoose from "mongoose";


export interface ProductViewDocument extends Document{
    productId: string,
    ipAddress: string,
    createdAt?: Date
} 

const productViewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
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
export const ProductView = mongoose.model<ProductViewDocument>("ProductView", productViewSchema)