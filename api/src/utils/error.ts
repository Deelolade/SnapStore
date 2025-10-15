import { Request, Response, NextFunction } from 'express';

// Custom error class to include statusCode
class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (statusCode: number, message: string): AppError => {
  return new AppError(statusCode, message);
};

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({ success: false, message });
};
