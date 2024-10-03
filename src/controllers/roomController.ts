import { Request, Response } from "express";
import roomService from "../services/roomService";
import { DecodedToken } from "../interfaces/auth";

class RoomController {
  async bookRoom(req: Request & { user?: DecodedToken }, res: Response) {
    try {
      const userId = req.user?.id as number;
      const { roomIds, checkInDate, checkOutDate } = req.body;
      const booking = await roomService.createBooking(userId, roomIds, new Date(checkInDate), new Date(checkOutDate));
      res.status(201).json({ booking });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getUserBookings(req: Request & { user?: DecodedToken }, res: Response) {
    try {
      const userId = req.user?.id as number;
      const bookings = await roomService.getBookingsByUser(userId);

      res.status(200).json({ bookings });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async cancelBooking(req: Request & { user?: DecodedToken }, res: Response) {
    try {
      const userId = req.user?.id as number;
      const bookingId = parseInt(req.params.bookingId);

      if (isNaN(bookingId)) {
        return res.status(400).json({ error: "Invalid booking ID" });
      }

      const cancelledBooking = await roomService.cancelBooking(userId, bookingId);
      res.status(200).json({ message: "Booking cancelled successfully", booking: cancelledBooking });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new RoomController();
