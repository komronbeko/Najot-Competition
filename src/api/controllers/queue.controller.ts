import { NextFunction, Request, Response } from "express";
import Doctor from "../../models/Doctor";
import Inspection from "../../models/Inspection";
import Patient from "../../models/Patient";

interface CustomRequest extends Request {
  verified?: {
    patientId?: string;
  };
}

export const createQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { verified: patientId } = req as CustomRequest;

    Inspection.create({ doctor: id, patient: patientId?.patientId });

    res.status(201).json({ message: "Navbat olindi" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get queue

export const getQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { verified: patientId } = req as CustomRequest;

    const doctor = await Doctor.findById(id);
    const queue = (await Inspection.find({ doctor: id })).length;
    const patient = await Patient.findById(patientId?.patientId);
    const inspection = (
      await Inspection.find({
        $and: [
          { patient: patientId?.patientId },
          { inspection_status: "checked" },
          { doctor: id },
        ],
      })
    ).length;

    const data = {
      doctor,
      queue,
      patient,
      inspection,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
