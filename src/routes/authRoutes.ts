import { Router } from "express";
import authController from "../controllers/authController";
import { validateLogin, validateRegister } from "../validation/auth.validation";

const authRoutes = Router();

// Version 1 routes
const v1Routes = Router();
v1Routes.post("/register", validateRegister, authController.register);
v1Routes.post("/login", validateLogin, authController.login);

// Apply versioning to routes
authRoutes.use("/v1", v1Routes);

export default authRoutes;
