import { Request, Response } from "express";
import { deleteUserWithId, getAllUsers } from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const users = await deleteUserWithId(+id);

    res.status(200).json({
      msg: "User has been deleted!",
    });
  } catch (error) {
    const id = req.params.id;

    res.status(500).json({
      error: `Failed to delete a user with ID ${id}`,
    });
  }
};
