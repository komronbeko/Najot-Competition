"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDoctors = exports.searchDoctorsCategory = exports.getOneDoctor = exports.deleteDoctor = exports.updateDoctor = exports.getAllDoctor = exports.createDoctor = void 0;
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const Inspection_1 = __importDefault(require("../../models/Inspection"));
const Patient_1 = __importDefault(require("../../models/Patient"));
const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+9989\d{8}$/;
    return regex.test(phoneNumber);
};
const createDoctor = async (req, res, next) => {
    try {
        const { imageName: image } = req;
        const { doctor_name, doctor_lname, doctor_phone_number, doctor_specialty, doctor_working_time, doctor_working_day, doctor_floor_no, doctor_room_no, doctor_qualification, doctor_clinic_address, } = req.body;
        const findPhone = await Doctor_1.default.findOne({ doctor_phone_number });
        if (findPhone)
            return res.status(400).json({ message: "Phone number already exists" });
        //
        const isvalid = validatePhoneNumber(doctor_phone_number);
        if (!isvalid)
            return res
                .status(400)
                .json({ message: "To'g'ri telefon raqam kiriting!" });
        Doctor_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
};
exports.createDoctor = createDoctor;
// read all
const getAllDoctor = async (req, res, next) => {
    try {
        const data = await Doctor_1.default.find();
        res.status(200).json({ data });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDoctor = getAllDoctor;
// update doctor
const updateDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { imageName: image } = req;
        console.log(image);
        const { doctor_name, doctor_lname, doctor_phone_number, doctor_specialty, doctor_working_time, doctor_working_day, doctor_floor_no, doctor_room_no, doctor_qualification, doctor_clinic_address, } = req.body;
        const isvalid = validatePhoneNumber(doctor_phone_number);
        if (!isvalid)
            return res
                .status(400)
                .json({ message: "To'g'ri telefon raqam kiriting!" });
        await Doctor_1.default.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateDoctor = updateDoctor;
// delete doctor
const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Doctor_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDoctor = deleteDoctor;
// get one
const getOneDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor_1.default.findById(id);
        //
        const number_of_queues = (await Inspection_1.default.find({ doctor: id })).length;
        const now = await Inspection_1.default.find({ doctor: id }).sort({
            createdAt: "asc",
        });
        const one = now.find((p) => p.inspection_status == "pending");
        const { patient } = one || { key: "Bemor yoq" };
        const nowOne = await Patient_1.default.findById(patient);
        //
        const data = {
            doctor,
            number_of_queues,
            now: nowOne,
        };
        res.status(200).json({ data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneDoctor = getOneDoctor;
// search by category
const searchDoctorsCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        const doctors = await Doctor_1.default.find({ doctor_specialty: category });
        res.status(200).json({ doctors });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.searchDoctorsCategory = searchDoctorsCategory;
// search by name or lname
const searchDoctors = async (req, res, next) => {
    try {
        const word = req.params.word;
        const doctors = await Doctor_1.default.find();
        const filteredDoctor = doctors.filter((doctor) => doctor.doctor_name.toLowerCase().includes(word.toLowerCase()));
        res.status(200).json({ doctor: filteredDoctor });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.searchDoctors = searchDoctors;
