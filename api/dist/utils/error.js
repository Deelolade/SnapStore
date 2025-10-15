"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.errorHandler = void 0;
// Custom error class to include statusCode
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the prototype chain is correctly set
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
const errorHandler = (statusCode, message) => {
    return new AppError(statusCode, message);
};
exports.errorHandler = errorHandler;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(statusCode).json({ success: false, message });
};
exports.errorMiddleware = errorMiddleware;
