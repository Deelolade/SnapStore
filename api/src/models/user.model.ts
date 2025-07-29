import mongoose, { Document, Schema } from "mongoose";

// Define the structure of social media links
interface SocialLink {
  platform: "whatsapp" | "instagram" | "facebook" | "twitter" | "linkedin";
  url: string;
}

// 1. Define the interface for a User document
export interface UserDocument extends Document {
  clerkId: string;
  name: string;
  email: string;
  profilePicture: string;
  storeSlug: string;
  socialMedia: SocialLink[];
}

const userSchema = new Schema<UserDocument>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
    },
    storeSlug: {
      type: String,
      unique: true,
      required: true
    },
    socialMedia: {
      type: [
        {
          platform: {
            type: String,
            enum: ["whatsapp", "instagram", "facebook", "twitter", "linkedin"],
            required: true,
          },
          url: { type: String, required: true },
        },
      ],
      default: [],
    },
    
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
