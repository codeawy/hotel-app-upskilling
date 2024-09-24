import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin, IUserRegister } from "../types/auth";
import { generateToken } from "../utils/jwtUtils";

class AuthService {
  async register({ email, name, password }: IUserRegister) {
    // * Check if user already exists
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      throw new Error("Email is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return userWithoutPassword;
  }

  async login({ email, password }: IUserLogin) {
    // * Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // * Generate JWT token
    const token = generateToken({ userId: existingUser.id, email: existingUser.email });

    const { password: _, ...rest } = existingUser;

    return { token, ...rest };
  }
}

export default new AuthService();
