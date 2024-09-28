import { body } from "express-validator";
import { validateRequest } from "../middleware/validationMiddleware";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name field is required"),
  body("email").isEmail().withMessage("Email field is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  validateRequest,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest,
];
