import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validationMiddleware";

export const validateBooking = [
  body("checkInDate")
    .isISO8601()
    .withMessage("Check-in date must be a valid date")
    .notEmpty()
    .withMessage("Check-in date is required"),

  body("checkOutDate")
    .isISO8601()
    .withMessage("Check-out date must be a valid date")
    .notEmpty()
    .withMessage("Check-out date is required"),

  body("roomIds")
    .isArray({ min: 1 })
    .withMessage("Room IDs must be a non-empty array")
    .custom(value => value.every((id: number) => typeof id === "number"))
    .withMessage("All room IDs must be numbers"),

  // Optionally, check if check-out date is after check-in date
  body("checkOutDate").custom((value, { req }) => {
    const checkInDate = new Date(req.body.checkInDate);
    const checkOutDate = new Date(value);
    if (checkOutDate <= checkInDate) {
      throw new Error("Check-out date must be after check-in date");
    }
    return true;
  }),
  validateRequest,
];

export const validateCancelBooking = [
  param("bookingId").isInt().withMessage("Booking ID must be an integer").toInt(),
  validateRequest,
];
