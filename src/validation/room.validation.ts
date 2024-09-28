import { body } from "express-validator";
import { RoomStatus, RoomType } from "@prisma/client";

export const createRoomValidators = [
  body("roomNumber")
    .isString()
    .notEmpty()
    .withMessage("Room number is required")
    .isLength({ min: 1, max: 10 })
    .withMessage("Room number must be between 1 and 10 characters"),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  body("roomStatus")
    .isIn(Object.values(RoomStatus))
    .withMessage(`Invalid room status. Valid statuses are: ${Object.values(RoomStatus).join(", ")}`),
  body("roomType")
    .isIn(Object.values(RoomType))
    .withMessage(`Invalid room type. Valid types are: ${Object.values(RoomType).join(", ")}`),
  body("pricePerNight").isFloat({ min: 0 }).withMessage("Price per night must be a positive number"),
];

export const updateRoomValidators = [
  body("roomNumber")
    .optional()
    .isString()
    .isLength({ min: 1, max: 10 })
    .withMessage("Room number must be between 1 and 10 characters"),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  body("roomStatus").optional().isIn(Object.values(RoomStatus)).withMessage("Invalid room status"),
  body("roomType").optional().isIn(Object.values(RoomType)).withMessage("Invalid room type"),
  body("pricePerNight").optional().isFloat({ min: 0 }).withMessage("Price per night must be a positive number"),
];
