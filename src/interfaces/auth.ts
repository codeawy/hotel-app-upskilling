import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    iat: number;
    exp: number;
  };
}

export interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
