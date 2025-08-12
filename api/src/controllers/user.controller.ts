import {  Request ,Response } from "express";
import { RequireAuthProp, clerkClient } from "@clerk/clerk-sdk-node";
import {User } from "../models/user.model";
import { uploadImage, uploadImages } from "../utils/cloudinary";

type ClerkRequest = RequireAuthProp<Request>

export const clerkUserAuth = async(req:ClerkRequest, res:Response)=>{
  const {userId} = req.auth;
  console.log("Clerk userId:", userId);
  console.log(req.auth)

  let user = await  User.findOne({clerkId:userId})

  if(!user){
    const newUser = await clerkClient.users.getUser(userId)

    user = await User.create({
      clerkId : userId,
      name: newUser.firstName + " " + newUser.lastName,
      email: newUser.emailAddresses[0].emailAddress,
      profilePicture: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png", // Default placeholder image
    })
  }
  res.status(200).json({message: "User synced successfully", user})
  console.log(user)
} 

export const updateUserProfile = async(req:ClerkRequest, res:Response)=>{
  try {
    const {userId} = req.auth;
    const { name, email, storeSlug, socialMedia, phoneNumber, profilePictureUrl } = req.body;
    let updatedFields = {
      name,
      email,
      storeSlug,
      phoneNumber,
      socialMedia:JSON.parse(socialMedia)
    };
    if (req.file) {
    const imageUrl = await uploadImage(req.file);
    updatedFields.profilePicture = imageUrl;
    }
    else if ( profilePictureUrl){
      updatedFields.profilePicture = profilePictureUrl;
    }
    const updatedUser = await User.findOneAndUpdate(
      {clerkId:userId}, 
      {$set: updatedFields},
      {new:true, runValidators:true}
    );
    if(!updatedUser){
      return res.status(404).json({message:"User not found"})
    }

    console.log("Profile updated successfully:", updatedUser);
    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      message: "Failed to update profile", 
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

 

