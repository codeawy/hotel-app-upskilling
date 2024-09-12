import { Request, Response } from "express";
import { createANewUser, deleteUserWithId, getAllUsers, updateUserWithId } from "../services/users.service";
import prisma from "../prisma";

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
  const id = req.params.id;

  try {
    res.status(200).json({
      msg: "User has been deleted!",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete a user with ID ${id}`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdmin } = req.body;

    // * Check fi email already taken
    const existsEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existsEmail) {
      return res.status(400).json({
        msg: "Email is already taken",
      });
    }

    // ** Create a new user
    const newUser = await createANewUser({
      name,
      email,
      isAdmin,
    });

    res.status(201).json({
      msg: "User have been created",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to create a user`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, isAdmin } = req.body;

    const updatedUser = await updateUserWithId({ id: +id, data: { name, isAdmin } });

    res.status(201).json({
      msg: "User have been updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to update a user`,
    });
  }
};
