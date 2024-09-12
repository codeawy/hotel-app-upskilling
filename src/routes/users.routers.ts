import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/users.controller";

const usersRouter = Router();

// * GET
usersRouter.get("/", getUsers);

// ** DELETE
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
