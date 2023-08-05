"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    doctor: {
        type: String,
        required: true,
    },
    patient: {
        type: String,
        required: true,
    },
    inspection_desc: {
        type: String,
        default: "pending",
    },
    image: {
        type: String,
        default: "pending"
    },
    inspection_status: {
        type: String,
        default: "pending",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Inspection", schema);
