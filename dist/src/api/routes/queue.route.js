"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queue_controller_1 = require("../controllers/queue.controller");
const isAuth_1 = require("../middlewares/isAuth");
const router = (0, express_1.Router)();
router.post("/queue/:id", isAuth_1.isAuth, queue_controller_1.createQueue);
router.get("/queue/:id", queue_controller_1.getQueue);
exports.default = router;
