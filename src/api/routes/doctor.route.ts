import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctor,
  getOneDoctor,
  searchDoctors,
  searchDoctorsCategory,
  updateDoctor,
} from "../controllers/doctor.controller";
import { fileUpload } from "../middlewares/fileUpload";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuth } from "../middlewares/isAuth";
import { isDoctor } from "../middlewares/isDoctor";
const router = Router();

router.post("/doctors", isAuth, isAdmin, fileUpload, createDoctor);
router.get("/doctors", getAllDoctor);
router.put("/doctor/:id", isAuth, isDoctor,fileUpload, updateDoctor);
router.delete("/doctor/:id", isAuth, isAdmin, deleteDoctor);
router.get("/doctor/:id", getOneDoctor);
router.post("/doctors/:category", searchDoctorsCategory);
router.get("/doctors/search/:word", searchDoctors);

export default router;
