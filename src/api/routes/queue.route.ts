import { Router } from "express";
import { createQueue, getQueue } from "../controllers/queue.controller";
import { isAuth } from "../middlewares/isAuth";
const router = Router();

router.post("/queue/:id", isAuth, createQueue);
router.get("/queue/:id", getQueue);

export default router;
