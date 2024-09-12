import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/:id").delete(deleteUser).put(updateUser);

export default usersRouter;
