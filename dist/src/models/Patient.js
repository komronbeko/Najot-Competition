"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    patient_lname: {
        type: String,
        required: true,
    },
    patient_age: {
        type: Number,
        required: true,
    },
    patient_phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    patient_email: {
        type: String,
        required: true,
        unique: true,
    },
    patient_password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Patient", schema);
