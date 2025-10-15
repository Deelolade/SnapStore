"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.clerkUserAuth = void 0;
const express_1 = require("@clerk/express");
const user_model_1 = require("../models/user.model");
const cloudinary_1 = require("../utils/cloudinary");
const clerkUserAuth = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        let user = await user_model_1.User.findOne({ clerkId: userId });
        if (!user) {
            const newUser = await express_1.clerkClient.users.getUser(userId);
            user = await user_model_1.User.create({
                clerkId: userId,
                name: `${newUser.firstName ?? ""} ${newUser.lastName ?? ""}`.trim(),
                email: newUser.emailAddresses[0].emailAddress,
                profilePicture: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png", // Default placeholder image
            });
        }
        res.status(200).json({ message: "User synced successfully", user });
        console.log(user);
    }
    catch (error) {
        next(error);
    }
};
exports.clerkUserAuth = clerkUserAuth;
const updateUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        const { name, email, storeSlug, socialMedia, whatsappNumber, profilePictureUrl } = req.body;
        console.log(req.body);
        const updatedFields = {
            name,
            email,
            storeSlug,
            whatsappNumber,
            socialMedia: socialMedia ? JSON.parse(socialMedia) : undefined,
        };
        if (req.file) {
            const imageUrl = await (0, cloudinary_1.uploadImage)(req.file);
            updatedFields.profilePicture = imageUrl;
        }
        else if (profilePictureUrl) {
            updatedFields.profilePicture = profilePictureUrl;
        }
        const updatedUser = await user_model_1.User.findOneAndUpdate({ clerkId: userId }, { $set: updatedFields }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // update user
        const [firstName, ...lastNameParts] = name.split(" ");
        const lastName = lastNameParts.join(" ") || "";
        await express_1.clerkClient.users.updateUser(userId, {
            firstName,
            lastName,
        });
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    }
    catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            message: "Failed to update profile",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
exports.updateUserProfile = updateUserProfile;
