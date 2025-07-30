import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";

export interface AuthenticatedRequest extends Request {
  user?: string;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Backend received token:", token);

  try {
    const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    req.user = session.sub;
    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(401).json({ message: "Invalid token" });
  }
};