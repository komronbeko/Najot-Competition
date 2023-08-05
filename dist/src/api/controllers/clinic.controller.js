"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClinic = exports.getOneClinic = exports.deleteClinic = exports.updateClinic = exports.getClinics = exports.createClinic = void 0;
const Clinic_1 = __importDefault(require("../../models/Clinic"));
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const Service_1 = __importDefault(require("../../models/Service"));
// regex
const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+9989\d{8}$/;
    return regex.test(phoneNumber);
};
const createClinic = async (req, res, next) => {
    try {
        const { clinic_name, clinic_about, clinic_address, call_center } = req.body;
        const { imageName: image } = req;
        const isvalid = validatePhoneNumber(call_center);
        if (!isvalid)
            return res
                .status(400)
                .json({ message: "To'g'ri telefon raqam kiriting!" });
        Clinic_1.default.create({
            clinic_name,
            clinic_about,
            clinic_address,
            call_center,
            image: image,
        });
        res.status(201).json({ message: "Clinic created successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.createClinic = createClinic;
// get all
const getClinics = async (req, res, next) => {
    try {
        const data = await Clinic_1.default.find();
        res.status(200).json({ data: data });
    }
    catch (error) {
        next(error);
    }
};
exports.getClinics = getClinics;
// update clinic
const updateClinic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { clinic_name, clinic_about, clinic_address, call_center } = req.body;
        const { imageName: image } = req;
        const isvalid = validatePhoneNumber(call_center);
        if (!isvalid)
            return res
                .status(400)
                .json({ message: "To'g'ri telefon raqam kiriting!" });
        await Clinic_1.default.findByIdAndUpdate(id, {
            $set: {
                clinic_name,
                clinic_about,
                clinic_address,
                call_center,
                image: image,
            },
        });
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateClinic = updateClinic;
// delete clinic
const deleteClinic = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Clinic_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted clinic" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteClinic = deleteClinic;
// get one clinic
const getOneClinic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const clinic = await Clinic_1.default.findById(id);
        const findDoctors = await Doctor_1.default.find({ doctor_clinic_address: id });
        const findService = await Service_1.default.find({ clinic_address: id });
        const newData = {
            clinic,
            doctors: findDoctors,
            services: findService,
        };
        res.status(200).json({ data: newData });
    }
    catch (error) {
        console.log(error);
        next(Error);
    }
};
exports.getOneClinic = getOneClinic;
// search
const searchClinic = async (req, res, next) => {
    try {
        const word = req.params.word;
        const clinics = await Clinic_1.default.find();
        const filteredClinics = clinics.filter((clinic) => clinic.clinic_name.toLowerCase().includes(word.toLowerCase()));
        res.status(200).json({ clinics: filteredClinics });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.searchClinic = searchClinic;
