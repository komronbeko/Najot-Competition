"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const Patient_1 = __importDefault(require("../../models/Patient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const registerController = async (req, res, next) => {
    try {
        const { patient_name, patient_lname, patient_age, patient_phone_number, patient_email, patient_password, } = req.body;
        const findPatient = await Patient_1.default.findOne({ patient_email });
        if (findPatient)
            return res.status(403).json({ message: "Patient already exists" });
        const hashPass = await bcrypt_1.default.hash(patient_password, 10);
        const patient = await Patient_1.default.create({
            patient_name,
            patient_lname,
            patient_age,
            patient_phone_number,
            patient_email,
            patient_password: hashPass,
        });
        if (!config_1.default.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in the config");
        }
        const patientId = patient?._id?.toString();
        const token = jsonwebtoken_1.default.sign({ patientId }, config_1.default.SECRET_KEY);
        res.status(201).json({ token });
    }
    catch (error) {
        next(error);
    }
};
exports.registerController = registerController;
