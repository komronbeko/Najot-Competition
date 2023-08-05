import { Router } from "express";
import {
  createInspection,
  getCheckPaint,
  getOnePatientInfo,
  theNextInspection,
} from "../controllers/checkPatient.controller";
import { fileUpload } from "../middlewares/fileUpload";
import { isAuth } from "../middlewares/isAuth";
import { isDoctor } from "../middlewares/isDoctor";
const router = Router();

router.post("/nextinspection", isAuth, isDoctor, theNextInspection);
router.get("/checkpaints", isAuth, isDoctor, getCheckPaint);
router.put("/inspection/:inspectionId", fileUpload, createInspection);
router.get("/patientinfo/:patientId", isAuth, isDoctor, getOnePatientInfo);

export default router;
