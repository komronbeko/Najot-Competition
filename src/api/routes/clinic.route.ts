import { Router } from "express";
import {
  createClinic,
  deleteClinic,
  getClinics,
  getOneClinic,
  searchClinic,
  updateClinic,
} from "../controllers/clinic.controller";
import { fileUpload } from "../middlewares/fileUpload";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuth } from "../middlewares/isAuth";
const router = Router();

router.post("/clinics", isAuth, isAdmin, fileUpload, createClinic);
router.get("/clinics", getClinics);
router.put("/clinics/:id", isAuth, isAdmin, updateClinic);
router.delete("/clinics/:id", isAuth, isAdmin, deleteClinic);
router.get("/clinics/:id", getOneClinic);
router.get("/clinics/search/:word", searchClinic);

export default router;
