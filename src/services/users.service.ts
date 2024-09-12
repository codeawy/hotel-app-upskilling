import { CreateUserDto } from "../dto/user.dto";
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

const createANewUser = async (user: CreateUserDto) => {
  return await prisma.user.create({
    data: user,
  });
};

export { getAllUsers, deleteUserWithId, createANewUser };
