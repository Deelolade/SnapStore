"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const backend_1 = require("@clerk/backend");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "No authorization header provided" });
            return;
        }
        if (!authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "Invalid authorization header format. Use 'Bearer <token>'" });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        // Validate token format (basic JWT structure check)
        if (!token.includes('.') || token.split('.').length !== 3) {
            res.status(401).json({ message: "Invalid token format" });
            return;
        }
        if (!process.env.CLERK_SECRET_KEY) {
            console.error("CLERK_SECRET_KEY is not defined");
            res.status(500).json({ message: "Server configuration error" });
            return;
        }
        const session = await (0, backend_1.verifyToken)(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });
        req.user = session.sub;
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        if (error instanceof Error) {
            if (error.message.includes('token-invalid')) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }
            if (error.message.includes('token-expired')) {
                res.status(401).json({ message: "Token has expired" });
                return;
            }
        }
        res.status(401).json({ message: "Authentication failed" });
    }
};
exports.authenticate = authenticate;
