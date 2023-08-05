"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDoctor = void 0;
const isDoctor = async (req, res, next) => {
    if (!req.verified || req.verified.role !== "doctor") {
        return res.status(400).json({ message: "You are not Doctor" });
    }
    next();
};
exports.isDoctor = isDoctor;
