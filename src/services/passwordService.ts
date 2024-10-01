import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../prisma";
import emailService from "./emailService";

class PasswordService {
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    });

    // * TODO: change to production url, and add frontend url
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    await emailService.sendEmail(user.email, "Password Reset", `Click this link to reset your password: ${resetUrl}`);
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  }
}

export default new PasswordService();
