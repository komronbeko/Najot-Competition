"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const potient_controller_1 = require("../controllers/potient.controller");
const router = (0, express_1.Router)();
router.get("/potients", potient_controller_1.getPotient);
router.put("/potients/:id", potient_controller_1.updatePotient);
router.delete("/potients/:id", potient_controller_1.deletePotient);
router.get("/potients/:id", potient_controller_1.getOnePotient);
exports.default = router;
