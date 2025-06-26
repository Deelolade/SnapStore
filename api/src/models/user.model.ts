import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    },
    profilePicture:{
        type: String,
        default: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
    },
},{timestamps:true}
)
export const User = mongoose.model("User", userSchema);

