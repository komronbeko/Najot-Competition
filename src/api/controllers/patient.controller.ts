import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Patient from "../../models/Patient";


// get all
export const getPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Patient.find();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
// update
export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      patient_name,
      patient_lname,
      patient_age,
      patient_phone_number,
      patient_email,
      patient_password,
    } = req.body;

    let hashPass;
    if (patient_password) {
      hashPass = await bcrypt.hash(patient_password, 10);
    }

    await Patient.findByIdAndUpdate(id, {
      $set: {
        patient_name,
        patient_lname,
        patient_age,
        patient_phone_number,
        patient_email,
        patient_password: hashPass,
      },
    });

    res.status(200).json({ message: "Updated patient" });
  } catch (error) {
    next(error);
  }
};
// delete
export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);

    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted potient" });
  } catch (error) {
    next(error);
  }
};
// get one

export const getOnePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Patient.findById(id);

    res.status(200).json({ data: data });
  } catch (error) {
    next(Error);
  }
};
