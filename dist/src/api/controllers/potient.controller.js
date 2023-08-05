"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePotient = exports.deletePotient = exports.updatePotient = exports.getPotient = void 0;
const Patient_1 = __importDefault(require("../../models/Patient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getPotient = async (req, res, next) => {
    try {
        const data = await Patient_1.default.find();
        res.status(200).json({ data });
    }
    catch (error) {
        next(error);
    }
};
exports.getPotient = getPotient;
// update
const updatePotient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { potient_name, potient_lname, potient_age, potient_phone_number, potient_email, potient_password, } = req.body;
        let hashPass;
        if (potient_password) {
            hashPass = await bcrypt_1.default.hash(potient_password, 10);
        }
        await Patient_1.default.findByIdAndUpdate(id, {
            $set: {
                potient_name,
                potient_lname,
                potient_age,
                potient_phone_number,
                potient_email,
                potient_password: hashPass,
            },
        });
        res.status(200).json({ message: "Updated potient" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePotient = updatePotient;
// delete
const deletePotient = async (req, res, next) => {
    try {
        const { id } = req.body;
        await Patient.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted potient" });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePotient = deletePotient;
// get one
const getOnePotient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Patient_1.default.findById(id);
        res.status(200).json({ data: data });
    }
    catch (error) {
        next(Error);
    }
};
exports.getOnePotient = getOnePotient;
