import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name field is required"),
  body("email").isEmail().withMessage("Email field is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
