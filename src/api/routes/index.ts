import clinicRouter from "./clinic.route";
import registerRoute from "./auth.route";
import potientRoute from "./patient.route";
import doctorRoute from "./doctor.route";
import serviceRoute from "./service.route";
import queueRoute from "./queue.route";
import checkRoute from "./checkPaint.route"

export default [
  clinicRouter,
  registerRoute,
  potientRoute,
  doctorRoute,
  serviceRoute,
  queueRoute,
  checkRoute
];
