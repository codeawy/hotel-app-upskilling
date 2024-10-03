import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import roomController from "../controllers/roomController";
import { validateBooking } from "../validation/booking.validation";

const bookingRoutes = Router();

bookingRoutes.get("/history", authMiddleware, roomController.getUserBookings);
bookingRoutes.post("/book", authMiddleware, validateBooking, roomController.bookRoom);
bookingRoutes.post("/cancel/:bookingId", authMiddleware, roomController.cancelBooking);

export default bookingRoutes;
