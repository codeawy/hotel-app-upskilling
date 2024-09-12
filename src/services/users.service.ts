import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
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

const updateUserWithId = async ({ data, id }: { data: UpdateUserDto; id: number }) => {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
};

export { getAllUsers, deleteUserWithId, createANewUser, updateUserWithId };
