import express, { Application } from "express";
import cors from "cors";
import cron from "node-cron";
import fileUload from "express-fileupload";
import { errorHandler } from "../api/middlewares/error-handler";
import routes from "../api/routes/index";
import Inspection from "../models/Inspection";

const modules = async (app: Application) => {
  // navbatlar ro'yxatini har kuni tozalash
  const clearTable = async () => {
    try {
      await Inspection.deleteMany({});
      console.log("Table tozalandi");
    } catch (error) {
      console.error("Xato yuz berdi:", error);
    }
  };

  // Cron jobni sozlash
  cron.schedule("0 0 * * *", clearTable);

  app.use(cors({ origin: "*" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(fileUload());
  app.use(express.static(`${process.cwd()}/uploads`));
  app.use("/api", routes);
  app.use(errorHandler);
};

export default modules;
