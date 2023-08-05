"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    clinic_name: {
        type: String,
        required: true,
    },
    clinic_about: {
        type: String,
        required: true,
    },
    clinic_address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    call_center: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Clinic", schema);
