import express, { Request, Response, NextFunction } from "express";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
// import compression from "compression";
import { urlencoded } from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../dist/swagger/swagger.json";
import loggerMiddleware from "@post/middlewares/logger-handle";
import { StatusCode } from "./utils/const";
import { logger } from "./utils/logger";
import { errorHandler } from "@post/middlewares/error-handle";
import getConfig from "@post/utils/config";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

// Get the Configs
const config = getConfig(process.env.NODE_ENV);
const gatewayService = getConfig().apiGatewayUrl || 'http://localhost:3000'

// =======================
// Security Middlewares
// =======================
app.set("trust proxy", 1);
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: [config.apiGatewayUrl as string, `${gatewayService}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


// =======================
// Standard Middleware
// =======================
// app.use(compression());
app.use(express.json({ limit: "200mb" }));
app.use(urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));
app.use(loggerMiddleware);

// ========================
// Global API V1
// ========================

// Swagger Documentation (testing route)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
RegisterRoutes(app);
// ========================
// Global Error Handler
// ========================
app.use("*", (req: Request, res: Response, _next: NextFunction) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  logger.error(`${fullUrl} endpoint does not exist`);
  res
    .status(StatusCode.NotFound)
    .json({ message: "The endpoint called does not exist." });
});
app.use(errorHandler);
