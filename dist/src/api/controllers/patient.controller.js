"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePatient = exports.deletePatient = exports.updatePatient = exports.getPatient = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Patient_1 = __importDefault(require("../../models/Patient"));
// get all
const getPatient = async (req, res, next) => {
    try {
        const data = await Patient_1.default.find();
        res.status(200).json({ data });
    }
    catch (error) {
        next(error);
    }
};
exports.getPatient = getPatient;
// update
const updatePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { patient_name, patient_lname, patient_age, patient_phone_number, patient_email, patient_password, } = req.body;
        let hashPass;
        if (patient_password) {
            hashPass = await bcrypt_1.default.hash(patient_password, 10);
        }
        await Patient_1.default.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        next(error);
    }
};
exports.updatePatient = updatePatient;
// delete
const deletePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        await Patient_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted potient" });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePatient = deletePatient;
// get one
const getOnePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Patient_1.default.findById(id);
        res.status(200).json({ data: data });
    }
    catch (error) {
        next(Error);
    }
};
exports.getOnePatient = getOnePatient;
