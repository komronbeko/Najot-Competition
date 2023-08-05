"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config/config"));
const run = async (app) => {
    if (!config_1.default.ConnectionString) {
        throw new Error("ConnectionString is not defined in the config");
    }
    await (0, mongoose_1.connect)(config_1.default.ConnectionString);
    app.listen(config_1.default.PORT, () => {
        console.log(`Server running on port : ${config_1.default.PORT}`);
    });
};
exports.default = run;
