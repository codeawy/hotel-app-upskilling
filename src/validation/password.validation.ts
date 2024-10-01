import { body } from "express-validator";
import { validateRequest } from "../middleware/validationMiddleware";

export const validateChangePassword = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
  validateRequest,
];

export const validateForgotPassword = [body("email").isEmail().withMessage("Valid email is required"), validateRequest];

export const validateResetPassword = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
  validateRequest,
];
