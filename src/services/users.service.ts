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

const createANewUser = async ({ user, email }: { user: CreateUserDto; email: string }) => {
  // * Check fi email already taken
  const existsEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existsEmail) {
    throw new Error("Email is already taken");
  }

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
