import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import passwordController from "../controllers/passwordController";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UserRole } from "../enum/user.enum";

const passwordRoutes = Router();
const { changePassword, forgotPassword, resetPassword } = passwordController;

passwordRoutes.use(authMiddleware, roleMiddleware(UserRole.GUEST));

passwordRoutes.route("/change").post(changePassword);
passwordRoutes.route("/forgot").post(forgotPassword);
passwordRoutes.route("/reset").post(resetPassword);

export default passwordRoutes;
