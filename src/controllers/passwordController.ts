import { Request, Response } from "express";
import passwordService from "../services/passwordService";
import { DecodedToken } from "../interfaces/auth";

class PasswordController {
  changePassword = async (req: Request & { user?: DecodedToken }, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      await passwordService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  forgetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await passwordService.forgetPassword(email);

      const resetTokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour
      res.status(200).json({
        message: "Password reset email sent",
        resetTokenExpires: resetTokenExpires
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .replace(/\//g, "-")
          .replace(",", ""),
      });
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
