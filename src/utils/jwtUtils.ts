import jwt from "jsonwebtoken";

export const generateToken = ({ userId, email, role }: { userId: number; email: string; role: string }) => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
