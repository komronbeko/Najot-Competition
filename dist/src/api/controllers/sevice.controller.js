"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = exports.getOneService = exports.deleteService = exports.updateService = exports.getServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../../models/Service"));
const createService = async (req, res, next) => {
    try {
        const { service_name, service_price, clinic_address } = req.body;
        const existingService = await Service_1.default.findOne({
            service_name: { $regex: new RegExp(`^${service_name}$`, "i") },
            clinic_address: clinic_address,
        });
        if (existingService) {
            return res.status(401).json({ message: "Service already exists" });
        }
        const newService = await Service_1.default.create({
            service_name,
            service_price,
            clinic_address,
        });
        res
            .status(201)
            .json({ message: "Service created successfully", data: newService });
    }
    catch (error) {
        next(error);
    }
};
exports.createService = createService;
// get all
const getServices = async (req, res, next) => {
    try {
        const data = await Service_1.default.find();
        res.status(200).json({ data: data });
    }
    catch (error) {
        next(error);
    }
};
exports.getServices = getServices;
// update Service
const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { service_name, service_price, clinic_address } = req.body;
        await Service_1.default.findByIdAndUpdate(id, {
            $set: {
                service_name,
                service_price,
                clinic_address,
            },
        });
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateService = updateService;
// delete service
const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Service_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted service" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteService = deleteService;
// get one service
const getOneService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Service_1.default.findById(id);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        next(Error);
    }
};
exports.getOneService = getOneService;
// search
const searchService = async (req, res, next) => {
    try {
        const word = req.params.word;
        const services = await Service_1.default.find();
        const filteredService = services.filter((service) => service.service_name.toLowerCase().includes(word.toLowerCase()));
        res.status(200).json({ service: filteredService });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.searchService = searchService;
