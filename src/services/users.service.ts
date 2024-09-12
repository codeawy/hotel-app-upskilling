import prisma from "../prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export { getAllUsers };
