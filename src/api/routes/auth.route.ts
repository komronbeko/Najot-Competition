import { Router } from "express";
import {
  adminLogin,
  doctorLogin,
  patientLogin,
} from "../controllers/login.controller";

import { registerController } from "../controllers/register.controller";
const router = Router();

router.post("/register", registerController);
router.post("/login", patientLogin);
router.post("/loginDoctor", doctorLogin);
router.post("/adminlogin", adminLogin);

export default router;
