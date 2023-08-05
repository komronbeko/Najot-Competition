import { NextFunction, Request, Response } from "express";
import Patient from "../../models/Patient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/config";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      patient_name,
      patient_lname,
      patient_age,
      patient_phone_number,
      patient_email,
      patient_password,
    } = req.body;

    const findPatient = await Patient.findOne({ patient_email });

    if (findPatient)
      return res.status(403).json({ message: "Patient already exists" });

    const hashPass = await bcrypt.hash(patient_password, 10);

    const patient = await Patient.create({
      patient_name,
      patient_lname,
      patient_age,
      patient_phone_number,
      patient_email,
      patient_password: hashPass,
    });
    if (!config.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the config");
    }
    const patientId = patient?._id?.toString();

    const token = jwt.sign({ patientId }, config.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

