import express, { Application } from "express";

const app: Application = express();

import modules from "./start/modules";
import run from "./start/run";

modules(app);
run(app)