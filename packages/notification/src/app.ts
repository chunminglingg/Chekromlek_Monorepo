import express from "express";
import { healthRoutes } from "./routes";

export const app = express();
app.use("/", healthRoutes);
