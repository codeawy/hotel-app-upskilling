import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enum/user.enum";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const roleMiddleware = (role: UserRole) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
