import mongoose from "mongoose";


export interface ProductViewDocument extends Document{
    productId: string,
    ipAddress: string,
    createdAt: Date;
    updatedAt: Date;
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
},{timestamps:true})
export const ProductView = mongoose.model<ProductViewDocument>("ProductView", productStatSchema)
export const ProductClick = mongoose.model<ProductViewDocument>("ProductClick", productStatSchema)