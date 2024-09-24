import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Define a custom interface for the decoded token
interface DecodedToken {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Please provide a valid token" });
  }
};
