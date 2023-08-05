"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clinic_route_1 = __importDefault(require("./clinic.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const patient_route_1 = __importDefault(require("./patient.route"));
const doctor_route_1 = __importDefault(require("./doctor.route"));
const service_route_1 = __importDefault(require("./service.route"));
const queue_route_1 = __importDefault(require("./queue.route"));
const checkPaint_route_1 = __importDefault(require("./checkPaint.route"));
exports.default = [
    clinic_route_1.default,
    auth_route_1.default,
    patient_route_1.default,
    doctor_route_1.default,
    service_route_1.default,
    queue_route_1.default,
    checkPaint_route_1.default
];
