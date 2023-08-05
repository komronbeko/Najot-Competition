import { NextFunction, Request, Response } from "express";
import Inspection from "../../models/Inspection";
import Patient from "../../models/Patient";

interface CustomRequest extends Request {
  verified?: {
    patientId?: string;
  };
  imageName?: {
    image?: string;
  };
}
export const getCheckPaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verified: doctorId } = req as CustomRequest;

    const patients = await Inspection.find({ doctor: doctorId }).sort({
      createdAt: "asc",
    });

    res.status(200).json({ patients });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//
export const getOnePatientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verified: doctorId } = req as CustomRequest;
    const { patientId } = req.params;
    const inspections = await Inspection.find({
      $and: [{ patient: patientId }, { doctor: doctorId }],
    });

    res.status(200).json({ inspections });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// create inspection and image

export const createInspection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { inspectionId } = req.params;
    const { imageName: image } = req;
    const { inspection_desc } = req.body;

    const inspections = await Inspection.findByIdAndUpdate(inspectionId, {
      $set: {
        inspection_desc,
        image: image,
        inspection_status: "checked",
      },
    });

    res.status(200).json({ message: "Tashxis qo'yildi" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// the next one
export const theNextInspection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verified: doctorId } = req as CustomRequest;
    const now = await Inspection.find({ doctor: doctorId }).sort({
      createdAt: "asc",
    });
    const one = now.find((p) => p.inspection_status == "pending");
    const { patient } = one || { key: "Bemor yoq" };
    const patientInfo = await Patient.findById(patient);

    const infoPatientIns = await Inspection.find({ patient: patient });
    const data = {
      patientInfo,
      infoPatientIns,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
