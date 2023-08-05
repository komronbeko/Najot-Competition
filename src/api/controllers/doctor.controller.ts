import { NextFunction, Request, Response } from "express";
import Doctor from "../../models/Doctor";
import Inspection from "../../models/Inspection";
import Patient from "../../models/Patient";

interface CustomRequest extends Request {
  imageName: string;
}

const validatePhoneNumber = (phoneNumber: string): boolean => {
  const regex = /^\+9989\d{8}$/;
  return regex.test(phoneNumber);
};
export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imageName: image } = req as CustomRequest;

    const {
      doctor_name,
      doctor_lname,
      doctor_phone_number,
      doctor_specialty,
      doctor_working_time,
      doctor_working_day,
      doctor_floor_no,
      doctor_room_no,
      doctor_qualification,
      doctor_clinic_address,
    } = req.body;
    const findPhone = await Doctor.findOne({ doctor_phone_number });
    if (findPhone)
      return res.status(400).json({ message: "Phone number already exists" });

    //

    const isvalid = validatePhoneNumber(doctor_phone_number);
    if (!isvalid)
      return res
        .status(400)
        .json({ message: "To'g'ri telefon raqam kiriting!" });
    Doctor.create({
      doctor_name,
      doctor_lname,
      doctor_phone_number,
      doctor_specialty,
      doctor_working_time,
      doctor_working_day,
      doctor_floor_no,
      doctor_room_no,
      doctor_qualification,
      doctor_clinic_address,
      image: image,
    });

    res.status(200).json({ message: "Created doctor" });
  } catch (error) {
    next(error);
  }
};

// read all
export const getAllDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Doctor.find();

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

// update doctor
export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { imageName: image } = req as CustomRequest;
    console.log(image);

    const {
      doctor_name,
      doctor_lname,
      doctor_phone_number,
      doctor_specialty,
      doctor_working_time,
      doctor_working_day,
      doctor_floor_no,
      doctor_room_no,
      doctor_qualification,
      doctor_clinic_address,
    } = req.body;

    const isvalid = validatePhoneNumber(doctor_phone_number);
    if (!isvalid)
      return res
        .status(400)
        .json({ message: "To'g'ri telefon raqam kiriting!" });
    await Doctor.findByIdAndUpdate(id, {
      $set: {
        doctor_name,
        doctor_lname,
        doctor_phone_number,
        doctor_specialty,
        doctor_working_time,
        doctor_working_day,
        doctor_floor_no,
        doctor_room_no,
        doctor_qualification,
        doctor_clinic_address,
        image: image,
      },
    });
    res.status(200).json({ message: "Updated doctor" });
  } catch (error) {
    next(error);
  }
};

// delete doctor
export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// get one
export const getOneDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    //
    const number_of_queues = (await Inspection.find({ doctor: id })).length;
    const now = await Inspection.find({ doctor: id }).sort({
      createdAt: "asc",
    });

    const one = now.find((p) => p.inspection_status == "pending");
    const { patient } = one || { key: "Bemor yoq" };

    const nowOne = await Patient.findById(patient);
    //

    const data = {
      doctor,
      number_of_queues,
      now: nowOne,
    };

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
// search by category
export const searchDoctorsCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.params.category;

    const doctors = await Doctor.find({ doctor_specialty: category });

    res.status(200).json({ doctors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// search by name or lname

export const searchDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const word = req.params.word;

    const doctors = await Doctor.find();

    const filteredDoctor = doctors.filter((doctor) =>
      doctor.doctor_name.toLowerCase().includes(word.toLowerCase())
    );

    res.status(200).json({ doctor: filteredDoctor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
