import { Room } from "@prisma/client";
import { CreateRoom, UpdateRoom } from "../interfaces/room";
import prisma from "../prisma";
import { paginate, PaginatedResult, PaginationOptions } from "../utils/pagination";
class AdminService {
  async createRoom(data: CreateRoom): Promise<Room> {
    // Check if the room number already exists
    const existingRoom = await prisma.room.findFirst({
      where: { roomNumber: data.roomNumber },
    });

    if (existingRoom) {
      throw new Error("Room number already exists");
    }

    // If room number is unique, create the new room
    return prisma.room.create({ data });
  }

  async getAllRooms(options: PaginationOptions): Promise<PaginatedResult<Room>> {
    return paginate<Room>(prisma.room, options);
  }

  async getRoomById(id: number): Promise<Room | null> {
    return prisma.room.findUnique({ where: { id } });
  }

  async updateRoom(id: number, data: UpdateRoom): Promise<Room> {
    return prisma.room.update({ where: { id }, data });
  }

  async deleteRoom(id: number): Promise<Room> {
    const existingRoom = await prisma.room.findUnique({ where: { id } });
    if (!existingRoom) {
      throw new Error("Room not found");
    }
    return prisma.room.delete({ where: { id } });
  }
}

export default new AdminService();
