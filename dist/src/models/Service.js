"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    service_name: {
        type: String,
        required: true,
    },
    service_price: {
        type: Number,
        required: true,
    },
    clinic_address: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Service", schema);
