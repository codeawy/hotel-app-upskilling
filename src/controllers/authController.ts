import { Request, Response } from "express";
import authService from "../services/authService";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.register({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default new AuthController();
