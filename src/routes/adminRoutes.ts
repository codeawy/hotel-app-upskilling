import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UserRole } from "../enum/user.enum";
import { validateRequest } from "../middleware/validationMiddleware";
import { createRoomValidators, updateRoomValidators } from "../validation/room.validation";
import adminController from "../controllers/adminController";

const adminRoutes = Router();

// Version 1 routes
const v1Routes = Router();

// ** TODO: We will implement the admin routes with Swagger documentation

v1Routes.use(authMiddleware, roleMiddleware(UserRole.ADMIN));

v1Routes
  .route("/rooms")
  .post(createRoomValidators, validateRequest, adminController.createRoom)
  .get(adminController.getAllRooms);

v1Routes
  .route("/rooms/:id")
  .get(adminController.getRoomById)
  .patch(updateRoomValidators, validateRequest, adminController.updateRoom)
  .delete(adminController.deleteRoom);

// Apply versioning to routes
adminRoutes.use("/v1", v1Routes);

export default adminRoutes;
