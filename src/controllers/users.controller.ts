import { Request, Response } from "express";
import { getAllUsers } from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    // ** get users data (from user service)
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get users",
    });
  }
};
