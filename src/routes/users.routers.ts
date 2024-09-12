import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/:id").delete(deleteUser);

export default usersRouter;
