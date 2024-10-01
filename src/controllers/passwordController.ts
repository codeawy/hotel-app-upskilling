import { Request, Response } from "express";
import passwordService from "../services/passwordService";

class PasswordController {
  changePassword = async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;
      await passwordService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await passwordService.forgotPassword(email);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      await passwordService.resetPassword(token, newPassword);

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}

export default new PasswordController();