import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true, // Important for linking Clerk user
      },
    name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
    },
},{timestamps:true}
)
export const User = mongoose.model("User", userSchema);

