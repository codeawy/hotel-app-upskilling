import prisma from "../prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const deleteUserWithId = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export { getAllUsers, deleteUserWithId };
