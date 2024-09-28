import { Request, Response } from "express";
import adminService from "../services/adminService";
import { CreateRoom, UpdateRoom } from "../interfaces/room";
import { PaginationOptions } from "../utils/pagination";

class AdminController {
  async createRoom(req: Request, res: Response) {
    try {
      const roomData: CreateRoom = req.body;
      const room = await adminService.createRoom(roomData);
      res.status(201).json(room);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const options: PaginationOptions = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        orderBy: { id: "asc" }, // You can make this dynamic based on query params if needed
      };
      const result = await adminService.getAllRooms(options);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  }

  async getRoomById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const room = await adminService.getRoomById(id);
      if (room) {
        res.json(room);
      } else {
        res.status(404).json({ error: "Room not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch room" });
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const roomData: UpdateRoom = req.body;
      const room = await adminService.updateRoom(id, roomData);
      res.json(room);
    } catch (error) {
      res.status(400).json({ error: "Failed to update room" });
    }
  }

  async deleteRoom(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await adminService.deleteRoom(id);
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }
}

export default new AdminController();
