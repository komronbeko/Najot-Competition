"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = async (req, res, next) => {
    if (!req.verified || req.verified.role !== "admin") {
        return res.status(400).json("You are not admin!");
    }
    next();
};
exports.isAdmin = isAdmin;
