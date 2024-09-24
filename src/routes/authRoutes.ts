import { Router } from "express";
import authController from "../controllers/authController";
import { validateRegister } from "../validation/auth.validation";

const authRoutes = Router();

authRoutes.post("/register", validateRegister, authController.register);
authRoutes.post("/login", authController.login);

export default authRoutes;
