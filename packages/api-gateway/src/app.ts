import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import applyProxy from "./middleware/proxy";
import { applyRateLimit } from "./middleware/rate-limit";
import cookieSession from "cookie-session";
import hpp from "hpp";
import { logger } from "./utils/logger";
import { StatusCode } from "./utils/consts";
import { errorHandler } from "./middleware/error-handler";
import getConfig from "./utils/createConfig";
import unless from "./middleware/unless-route";
import { verifyUser } from "./middleware/auth-middleware";

const app = express();

const config = getConfig();

// ===================
// Security Middleware
// ===================
app.set("trust proxy", 1);
// app.use(compression());
app.use(
  cookieSession({
    name: "session",
    keys: [`${config.cookieSecretKeyOne}`, `${config.cookieSecretKeyTwo}`],
    maxAge: 24 * 7 * 3600000,
    secure: config.env !== "development", // update with value from config
    ...(config.env !== "development" && { 
      sameSite: "none",
    }),
  })
);

// Prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Prevent Some Security:
// - Stops browsers from sharing your site's vistor data
// - Stops your website from being displayed in a frame
// - Prevent XSS, etc.
app.use(helmet());

// Only Allow Specific Origin to Access API Gateway (Frontend)!
app.use(
  cors({
    origin:
      config.env === "development"
        ? ["http://localhost:9000"]
        : ["https://domain.com"],
    credentials: true, // attach token from client
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH" , "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Apply Limit Request
applyRateLimit(app);

// Hide Express Server Information
app.disable("x-powered-by");

// ===================
// JWT Middleware
// ===================
// app.use(unless("/v1/auth", verifyUser));
const conditions = [
  { path: "/v1/auth" }, // Exclude all routes starting with /v1/auth
  { path: "/v1/post", method: "GET" }, // Exclude GET requests starting with /v1/events
  { path: "/v1/users/info" },
];

// Use verifyUser middleware with the unless function
app.use(unless(conditions, verifyUser));
// ===================
// Proxy Routes
// ===================
applyProxy(app);

// ====================
// Global Error Handler
// ====================
app.use("*", (req: Request, res: Response, _next: NextFunction) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  logger.error(`${fullUrl} endpoint does not exist`);
  res
    .status(StatusCode.NotFound)
    .json({ message: "The endpoint called does not exist." });
});

app.use(errorHandler);

export default app;
