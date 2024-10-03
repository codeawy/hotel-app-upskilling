import { BookingStatus, RoomStatus } from "@prisma/client";
import prisma from "../prisma";

class RoomService {
  // Check room availability
  async checkRoomAvailability(roomIds: number[], checkInDate: Date, checkOutDate: Date) {
    if (!Array.isArray(roomIds) || roomIds.length === 0) {
      throw new Error("Invalid room IDs provided");
    }

    if (
      !(checkInDate instanceof Date) ||
      isNaN(checkInDate.getTime()) ||
      !(checkOutDate instanceof Date) ||
      isNaN(checkOutDate.getTime())
    ) {
      throw new Error("Invalid date format provided");
    }

    const availableRooms = await prisma.room.findMany({
      where: {
        id: { in: roomIds },
        roomStatus: "Available",
        bookings: {
          none: {
            OR: [
              {
                booking: {
                  checkInDate: { lte: checkOutDate },
                  checkOutDate: { gte: checkInDate },
                },
              },
            ],
          },
        },
      },
    });

    if (availableRooms.length !== roomIds.length) {
      throw new Error("Some rooms are not available for the selected dates");
    }
    return availableRooms;
  }

  // Create a new booking
  async createBooking(userId: number, roomIds: number[], checkInDate: Date, checkOutDate: Date) {
    const availableRooms = await this.checkRoomAvailability(roomIds, checkInDate, checkOutDate);

    const totalPrice = availableRooms.reduce(
      (total: number, room: { pricePerNight: number }) => total + room.pricePerNight,
      0
    );

    // Check if the user exists before creating the booking
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const booking = await prisma.booking.create({
      data: {
        checkInDate,
        checkOutDate,
        totalPrice,
        payment: "Visa",
        bookingStatus: "Pending",
        bookingItems: {
          create: roomIds.map(roomId => ({
            roomId,
          })),
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    // Update room status to "Booked"
    await prisma.room.updateMany({
      where: { id: { in: roomIds } },
      data: { roomStatus: "Booked" },
    });

    return booking;
  }

  // Fetch bookings by user
  async getBookingsByUser(userId: number) {
    return prisma.booking.findMany({
      where: { userId },
      include: { bookingItems: { include: { room: true } } },
    });
  }

  async cancelBooking(userId: number, bookingId: number) {
    // Check if the booking exists and belongs to the user
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: userId,
      },
      include: {
        bookingItems: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found or does not belong to the user");
    }

    if (booking.bookingStatus === BookingStatus.Cancelled) {
      throw new Error("Booking is already cancelled");
    }

    // Update the booking status to Cancelled
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { bookingStatus: "Cancelled" },
    });

    // Update the room status back to Available
    await prisma.room.updateMany({
      where: {
        id: {
          in: booking.bookingItems.map(item => item.roomId),
        },
      },
      data: { roomStatus: RoomStatus.Available },
    });

    return updatedBooking;
  }
}

export default new RoomService();
