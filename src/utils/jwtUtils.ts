import jwt from "jsonwebtoken";

export const generateToken = ({ id, email, role }: { id: number; email: string; role: string }) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
