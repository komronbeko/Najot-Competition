import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
interface AdminRequest extends Request {
  verified?: {
    role: string;
  };
}

export const isAdmin = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.verified || req.verified.role !== "admin") {
    return res.status(400).json("You are not admin!");
  }
  next();
};
