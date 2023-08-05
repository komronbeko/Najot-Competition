"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueue = exports.createQueue = void 0;
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const Inspection_1 = __importDefault(require("../../models/Inspection"));
const Patient_1 = __importDefault(require("../../models/Patient"));
const createQueue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { verified: patientId } = req;
        Inspection_1.default.create({ doctor: id, patient: patientId?.patientId });
        res.status(201).json({ message: "Navbat olindi" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createQueue = createQueue;
// get queue
const getQueue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { verified: patientId } = req;
        const doctor = await Doctor_1.default.findById(id);
        const queue = (await Inspection_1.default.find({ doctor: id })).length;
        const patient = await Patient_1.default.findById(patientId?.patientId);
        const inspection = (await Inspection_1.default.find({
            $and: [
                { patient: patientId?.patientId },
                { inspection_status: "checked" },
                { doctor: id },
            ],
        })).length;
        const data = {
            doctor,
            queue,
            patient,
            inspection,
        };
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getQueue = getQueue;
