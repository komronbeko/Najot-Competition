"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNextInspection = exports.createInspection = exports.getOnePatientInfo = exports.getCheckPaint = void 0;
const Inspection_1 = __importDefault(require("../../models/Inspection"));
const Patient_1 = __importDefault(require("../../models/Patient"));
const getCheckPaint = async (req, res, next) => {
    try {
        const { verified: doctorId } = req;
        const patients = await Inspection_1.default.find({ doctor: doctorId }).sort({
            createdAt: "asc",
        });
        res.status(200).json({ patients });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getCheckPaint = getCheckPaint;
//
const getOnePatientInfo = async (req, res, next) => {
    try {
        const { verified: doctorId } = req;
        const { patientId } = req.params;
        const inspections = await Inspection_1.default.find({
            $and: [{ patient: patientId }, { doctor: doctorId }],
        });
        res.status(200).json({ inspections });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getOnePatientInfo = getOnePatientInfo;
// create inspection and image
const createInspection = async (req, res, next) => {
    try {
        const { inspectionId } = req.params;
        const { imageName: image } = req;
        const { inspection_desc } = req.body;
        const inspections = await Inspection_1.default.findByIdAndUpdate(inspectionId, {
            $set: {
                inspection_desc,
                image: image,
                inspection_status: "checked",
            },
        });
        res.status(200).json({ message: "Tashxis qo'yildi" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createInspection = createInspection;
// the next one
const theNextInspection = async (req, res, next) => {
    try {
        const { verified: doctorId } = req;
        const now = await Inspection_1.default.find({ doctor: doctorId }).sort({
            createdAt: "asc",
        });
        const one = now.find((p) => p.inspection_status == "pending");
        const { patient } = one || { key: "Bemor yoq" };
        const patientInfo = await Patient_1.default.findById(patient);
        const infoPatientIns = await Inspection_1.default.find({ patient: patient });
        const data = {
            patientInfo,
            infoPatientIns,
        };
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.theNextInspection = theNextInspection;
