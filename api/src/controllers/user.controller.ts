import { RequestHandler, NextFunction, Request, Response } from "express";
import { clerkClient } from "@clerk/express";
import { User } from "../models/user.model";
import { uploadImage } from "../utils/cloudinary";
import { AuthenticatedRequest } from "../utils/authMiddleware";

interface ClerkRequest extends Request {
  auth: {
    userId: string;
  }
}

export const clerkUserAuth = async (req: AuthenticatedRequest, res: Response, next:NextFunction) =>{

  try {
  const { userId } = (req as ClerkRequest ).auth;

  let user = await User.findOne({ clerkId: userId })

  if (!user) {
    const newUser = await clerkClient.users.getUser(userId)

    user = await User.create({
      clerkId: userId,
      name: `${newUser.firstName ?? ""} ${newUser.lastName ?? ""}`.trim(),
      email: newUser.emailAddresses[0].emailAddress,
      profilePicture: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png", // Default placeholder image
    })
  }
  res.status(200).json({ message: "User synced successfully", user })
  console.log(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = (req as ClerkRequest).auth;
    const { name, email, storeSlug, socialMedia, whatsappNumber, profilePictureUrl } = req.body;
    console.log(req.body)

    const updatedFields: Record<string, any> = {
      name,
      email,
      storeSlug,
      whatsappNumber,
      socialMedia: socialMedia ? JSON.parse(socialMedia) : undefined,
    };
    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      updatedFields.profilePicture = imageUrl;
    }
    else if (profilePictureUrl) {
      updatedFields.profilePicture = profilePictureUrl;
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: updatedFields },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // update user
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
    });

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



