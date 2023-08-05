import { NextFunction, Request, Response } from "express";
import Service from "../../models/Service";

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { service_name, service_price, clinic_address } = req.body;

    const existingService = await Service.findOne({
      service_name: { $regex: new RegExp(`^${service_name}$`, "i") },
      clinic_address: clinic_address,
    });

    if (existingService) {
      return res.status(401).json({ message: "Service already exists" });
    }

    const newService = await Service.create({
      service_name,
      service_price,
      clinic_address,
    });

    res
      .status(201)
      .json({ message: "Service created successfully", data: newService });
  } catch (error) {
    next(error);
  }
};

// get all
export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Service.find();
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

// update Service
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { service_name, service_price, clinic_address } = req.body;
    await Service.findByIdAndUpdate(id, {
      $set: {
        service_name,
        service_price,
        clinic_address,
      },
    });

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
};

// delete service

export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted service" });
  } catch (error) {
    next(error);
  }
};

// get one service
export const getOneService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Service.findById(id);

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);

    next(Error);
  }
};
// search
export const searchService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const word = req.params.word;

    const services = await Service.find();

    const filteredService = services.filter((service) =>
      service.service_name.toLowerCase().includes(word.toLowerCase())
    );

    res.status(200).json({ service: filteredService });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
