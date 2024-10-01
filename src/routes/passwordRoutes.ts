import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import passwordController from "../controllers/passwordController";
import {
  validateChangePassword,
  validateforgetPassword,
  validateResetPassword,
} from "../validation/password.validation";

const passwordRoutes = Router();
const { changePassword, forgetPassword, resetPassword } = passwordController;

passwordRoutes.route("/change").post(authMiddleware, validateChangePassword, changePassword);
passwordRoutes.route("/forget").post(validateforgetPassword, forgetPassword);
passwordRoutes.route("/reset").post(validateResetPassword, resetPassword);

export default passwordRoutes;
