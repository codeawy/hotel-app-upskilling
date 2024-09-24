import prisma from "../prisma";
import bcrypt from "bcrypt";
import { IUserRegister } from "../types/userRegister";

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

    return user;
  }
}

export default new AuthService();
