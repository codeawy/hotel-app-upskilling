import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthenticatedRequest, roleMiddleware } from "../middleware/roleMiddleware";
import { UserRole } from "../enum/user.enum";

const adminRoutes = Router();

adminRoutes.get(
  "/rooms",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  (req: AuthenticatedRequest, res: Response) => {
    res.send({ msg: "Admin can make all CRUD operations on the rooms" });
  }
);

export default adminRoutes;
