"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/register.controller");
const router = (0, express_1.Router)();
router.post("/register", register_controller_1.registerController);
exports.default = router;
