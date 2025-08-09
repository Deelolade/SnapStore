import mongoose from "mongoose";
import slugify from "slugify";


const productSchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String,
    },
    price:{
        type: Number,
        required: true
    },
    discountedPrice:{
        type: Number,
    },
    image:{
        type: [String],
    },
    views: { 
        type: Number, 
        default: 0
    },
    clicks: { 
        type: Number, 
        default: 0 
    },
    slug: { 
        type: String, 
        unique: true,
    },
    socialMedia: {
        type: [String], // array of platform names like ["whatsapp", "instagram"]
      }
},{timestamps: true});

productSchema.pre("save", function (next) {
    if (this.isModified("title")) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });
export const Product = mongoose.model("Product", productSchema)
