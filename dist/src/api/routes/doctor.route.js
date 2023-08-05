"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const fileUpload_1 = require("../middlewares/fileUpload");
const isAdmin_1 = require("../middlewares/isAdmin");
const isAuth_1 = require("../middlewares/isAuth");
const isDoctor_1 = require("../middlewares/isDoctor");
const router = (0, express_1.Router)();
router.post("/doctors", isAuth_1.isAuth, isAdmin_1.isAdmin, fileUpload_1.fileUpload, doctor_controller_1.createDoctor);
router.get("/doctors", doctor_controller_1.getAllDoctor);
router.put("/doctor/:id", isAuth_1.isAuth, isDoctor_1.isDoctor, fileUpload_1.fileUpload, doctor_controller_1.updateDoctor);
router.delete("/doctor/:id", isAuth_1.isAuth, isAdmin_1.isAdmin, doctor_controller_1.deleteDoctor);
router.get("/doctor/:id", doctor_controller_1.getOneDoctor);
router.post("/doctors/:category", doctor_controller_1.searchDoctorsCategory);
router.get("/doctors/search/:word", doctor_controller_1.searchDoctors);
exports.default = router;
