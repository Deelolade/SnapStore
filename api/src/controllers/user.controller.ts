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
    console.log("Update data:", req.body);
    const { name, email, storeSlug,  } = req.body;
    
    console.log("Updating profile for userId:", userId);
    console.log("Uploaded file:", req.file);

    const socialMedia = JSON.parse(req.body.socialMedia)

    console.log("socialMedia", socialMedia)

    // Find the user
    let user = await User.findOne({clerkId: userId});
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (req.file) {
      const imageUrl = await uploadImage(req.file);
    const updatedUser = await User.findOneAndUpdate({clerkId:userId}, {
      $set:{
        name,
        email,
        storeSlug,
        socialMedia,
        profilePicture:imageUrl
      }
    },{new:true, runValidators:true})
    if(!updatedUser){
      return res.status(404).json({message:"User not found"})
    }

    console.log("Profile updated successfully:", updatedUser);
    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  }
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      message: "Failed to update profile", 
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

// export const updateUserProfileWithImage = async(req:ClerkRequest, res:Response)=>{
//   try {
//     const {userId} = req.auth;
//     const { name, email, storeSlug, socialMedia } = req.body;
    
//     console.log("Updating profile with image for userId:", userId);
//     console.log("Update data:", req.body);
//     console.log("Files:", req.files);

//     // Find the user
//     let user = await User.findOne({clerkId: userId});
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Handle image upload if files are present
//     let profilePictureUrl = user.profilePicture; // Keep existing if no new image
    
//     if (req.files && req.files.length > 0) {
//       try {
//         console.log("Uploading image to Cloudinary...");
//         const uploadedUrls = await uploadImages(req.files);
//         profilePictureUrl = uploadedUrls[0]; // Take the first image as profile picture
//         console.log("Image uploaded successfully:", profilePictureUrl);
//       } catch (uploadError) {
//         console.error("Image upload error:", uploadError);
//         return res.status(500).json({ 
//           message: "Failed to upload image", 
//           error: uploadError instanceof Error ? uploadError.message : "Upload failed"
//         });
//       }
//     }

//     // Parse socialMedia if it's a JSON string
//     let parsedSocialMedia = socialMedia;
//     if (typeof socialMedia === 'string') {
//       try {
//         parsedSocialMedia = JSON.parse(socialMedia);
//       } catch (parseError) {
//         console.error("Error parsing socialMedia:", parseError);
//         parsedSocialMedia = [];
//       }
//     }

//     // Update user fields
//     const updateData: any = {
//       profilePicture: profilePictureUrl
//     };
    
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     if (storeSlug) updateData.storeSlug = storeSlug;
//     if (parsedSocialMedia) updateData.socialMedia = parsedSocialMedia;

//     // Update the user
//     const updatedUser = await User.findOneAndUpdate(
//       { clerkId: userId },
//       updateData,
//       { new: true, runValidators: true }
//     );

//     console.log("Profile with image updated successfully:", updatedUser);
//     res.status(200).json({ 
//       message: "Profile updated successfully", 
//       user: updatedUser 
//     });

//   } catch (error) {
//     console.error("Profile update with image error:", error);
//     res.status(500).json({ 
//       message: "Failed to update profile", 
//       error: error instanceof Error ? error.message : "Unknown error"
//     });
//   }
// } 

