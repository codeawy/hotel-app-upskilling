import { RoomStatus, RoomType } from "@prisma/client";

export interface CreateRoom {
  roomNumber: string;
  description?: string;
  roomStatus: RoomStatus;
  roomType: RoomType;
  pricePerNight: number;
}

export interface UpdateRoom {
  roomNumber?: string;
  description?: string;
  roomStatus?: RoomStatus;
  roomType?: RoomType;
  pricePerNight?: number;
}
