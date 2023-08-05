"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
if (!config_1.default.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the config");
}
const sign = (payload) => {
    if (!config_1.default.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in the config");
    }
    jsonwebtoken_1.default.sign(payload, config_1.default.SECRET_KEY, { expiresIn: "24h" });
};
const verify = (payload, err, data) => {
    if (!config_1.default.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in the config");
    }
    jsonwebtoken_1.default.verify(payload, config_1.default.SECRET_KEY);
};
exports.default = { sign, verify };
