import {  Request ,Response } from "express";
import { RequireAuthProp, clerkClient } from "@clerk/clerk-sdk-node";
 import {User } from "../models/user.model";


type ClerkRequest = RequireAuthProp<Request>

export const userAuth = async(req:ClerkRequest, res:Response)=>{
  const {userId} = req.auth;
  console.log("Clerk userId:", userId);

  let user = await  User.findOne({clerkId:userId})

  if(!user){
    const newUser = await clerkClient.users.getUser(userId)

    user = await User.create({
      clerkId : userId,
      name: newUser.firstName + " " + newUser.lastName,
      email: newUser.emailAddresses[0].emailAddress,
      profilePicture: newUser.imageUrl,
    })
  }
  res.status(200).json({message: "User synced successfully", user})
  console.log(user)
} 
