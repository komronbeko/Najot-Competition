import { Router } from "express";
import {
  deletePatient,
  getOnePatient,
  getPatient,
  updatePatient,
} from "../controllers/patient.controller";
const router = Router();

router.get("/patients", getPatient);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);
router.get("/patients/:id", getOnePatient);

export default router;
