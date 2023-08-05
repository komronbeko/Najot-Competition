"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const error_handler_1 = require("../api/middlewares/error-handler");
const index_1 = __importDefault(require("../api/routes/index"));
const Inspection_1 = __importDefault(require("../models/Inspection"));
const modules = async (app) => {
    // navbatlar ro'yxatini har kuni tozalash
    const clearTable = async () => {
        try {
            await Inspection_1.default.deleteMany({});
            console.log("Table tozalandi");
        }
        catch (error) {
            console.error("Xato yuz berdi:", error);
        }
    };
    // Cron jobni sozlash
    node_cron_1.default.schedule("0 0 * * *", clearTable);
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, express_fileupload_1.default)());
    app.use(express_1.default.static(`${process.cwd()}/uploads`));
    app.use("/api", index_1.default);
    app.use(error_handler_1.errorHandler);
};
exports.default = modules;
