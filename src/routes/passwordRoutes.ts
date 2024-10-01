import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import passwordController from "../controllers/passwordController";
import {
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
} from "../validation/password.validation";

const passwordRoutes = Router();
const { changePassword, forgotPassword, resetPassword } = passwordController;

passwordRoutes.route("/change").post(authMiddleware, validateChangePassword, changePassword);
passwordRoutes.route("/forgot").post(validateForgotPassword, forgotPassword);
passwordRoutes.route("/reset").post(validateResetPassword, resetPassword);

export default passwordRoutes;
