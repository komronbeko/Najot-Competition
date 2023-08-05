"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.doctorLogin = exports.patientLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Patient_1 = __importDefault(require("../../models/Patient"));
const custom_error_1 = require("../utils/custom-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const Clinic_1 = __importDefault(require("../../models/Clinic"));
const patientLogin = async (req, res, next) => {
    try {
        const { patient_email, patient_password } = req.body;
        const findPatient = await Patient_1.default.findOne({ patient_email }).exec();
        if (!findPatient)
            return new custom_error_1.CustomError("Invalid email or password!", 403);
        if (!findPatient || !findPatient.patient_password) {
            throw new Error("Invalid email or password!");
        }
        const verify = await bcrypt_1.default.compare(patient_password, findPatient.patient_password);
        if (!verify)
            return new custom_error_1.CustomError("Invalid email or password!", 403);
        if (!config_1.default.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in the config");
        }
        const token = jsonwebtoken_1.default.sign({ patientId: findPatient._id }, config_1.default.SECRET_KEY);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};
exports.patientLogin = patientLogin;
const doctorLogin = async (req, res, next) => {
    try {
        const { clinic, phone_number } = req.body;
        const findDoctor = await Doctor_1.default.findOne({
            doctor_phone_number: phone_number,
        });
        const findClinic = await Clinic_1.default.findOne({ clinic_name: clinic });
        if (!findDoctor)
            return res.status(403).json({ message: "Invalid phone number" });
        if (findDoctor.doctor_clinic_address.toString() !== findClinic?.id.toString())
            return res
                .status(403)
                .json({ message: "Siz bu klinikada ro'yxatdan o'tmagansiz" });
        if (!config_1.default.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in the config");
        }
        const token = jsonwebtoken_1.default.sign({ doctorId: findDoctor._id, role: findDoctor.role }, config_1.default.SECRET_KEY);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};
exports.doctorLogin = doctorLogin;
// admin login
const adminLogin = async (req, res, next) => {
    try {
        const Admin = {
            username: "admin",
            password: "admin",
        };
        const { username, password } = req.body;
        if (username !== Admin.username || password !== Admin.password)
            return res.status(403).json({ message: "You are not admin" });
        if (!config_1.default.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in the config");
        }
        const token = jsonwebtoken_1.default.sign({ role: "admin" }, config_1.default.SECRET_KEY);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};
exports.adminLogin = adminLogin;
