import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";

export interface AuthenticatedRequest extends Request {
  user?: string;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header provided" });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid authorization header format. Use 'Bearer <token>'" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Validate token format (basic JWT structure check)
    if (!token.includes('.') || token.split('.').length !== 3) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    if (!process.env.CLERK_SECRET_KEY) {
      console.error("CLERK_SECRET_KEY is not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const session = await verifyToken(token, { 
      secretKey: process.env.CLERK_SECRET_KEY 
    });
    
    req.user = session.sub;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('token-invalid')) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      if (error.message.includes('token-expired')) {
        return res.status(401).json({ message: "Token has expired" });
      }
    }
    
    res.status(401).json({ message: "Authentication failed" });
  }
};