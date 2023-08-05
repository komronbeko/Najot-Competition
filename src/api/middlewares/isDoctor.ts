import { NextFunction, Request, Response } from "express";
interface DoctorRequest extends Request {
  verified?: {
    role: string;
  };
}

export const isDoctor = async (
  req: DoctorRequest,
  res: Response,
  next: NextFunction
) => {
  
  if (!req.verified || req.verified.role !== "doctor") {
    return res.status(400).json({ message: "You are not Doctor" });
  }
  next();
};

