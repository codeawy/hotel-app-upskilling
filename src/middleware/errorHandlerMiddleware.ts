import { Request, Response, NextFunction } from "express";
class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  // Set default values for statusCode and message
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Something went wrong";

  // Respond with a JSON object
  res.status(statusCode).json({
    status: err instanceof AppError ? err.status : "error",
    message,
  });
};

// Helper to create AppError
export const createAppError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};
