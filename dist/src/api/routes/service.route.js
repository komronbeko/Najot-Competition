"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sevice_controller_1 = require("../controllers/sevice.controller");
const isAdmin_1 = require("../middlewares/isAdmin");
const isAuth_1 = require("../middlewares/isAuth");
const router = (0, express_1.Router)();
router.post("/service", isAuth_1.isAuth, isAdmin_1.isAdmin, sevice_controller_1.createService);
router.get("/service", sevice_controller_1.getServices);
router.put("/service/:id", isAuth_1.isAuth, isAdmin_1.isAdmin, sevice_controller_1.updateService);
router.delete("/service/:id", isAuth_1.isAuth, isAdmin_1.isAdmin, sevice_controller_1.deleteService);
router.get("/service/:id", sevice_controller_1.getOneService);
router.get("/service/search/:word", sevice_controller_1.searchService);
exports.default = router;
