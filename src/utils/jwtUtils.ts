import jwt from "jsonwebtoken";

export const generateToken = ({ userId, email }: { userId: number; email: string }) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
