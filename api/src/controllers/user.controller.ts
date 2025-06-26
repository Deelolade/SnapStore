import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { transporter } from "../utils/mailer"
import { emailTemplate } from "../templates/verificationEmail";


const sendVerificationEmail = async (email: string, token: string) => {
const frontendBase = process.env.FRONTEND_URL || "http://localhost:3000";
const verificationLink = `${frontendBase}/verify/${token}`;


 
  // MAil verification logic
  await transporter.sendMail({
    from: `Deelolade ${process.env.EMAIL_USER}`,
    to: email,
    subject: "Verify Your Email",
    text: `Click the link to verify your email: ${verificationLink}`,
    html: emailTemplate(verificationLink),
  });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Account already existed!",
      });
    }

    // hash user passwords
    const hashedPassword = bcryptjs.hashSync(password, 12);
    console.log("hashedpassword:", hashedPassword);

    //create new user with verification token
    const verificationToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // save new user data
    await newUser.save();

    await sendVerificationEmail(newUser.email, verificationToken);
    res.status(201).json({
      success: true,
      message:
        "User created successfully. A verification email has been sent. Please check your inbox to verify your email before logging in.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to create user's profile !",
    });
  }
};
