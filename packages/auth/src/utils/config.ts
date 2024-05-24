import dotenv from "dotenv";
import APIError from "../errors/api-error";
import path from "path";
dotenv.config();
function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = [
    "NODE_ENV",
    "PORT",
    "MONGO_URL",
    "LOG_LEVEL",
    "RABBITMQ_ENDPOINT",
    "CLIENT_URL",
    "REDIRECT_URL",
    "CLIENT_SECRET",
    "CLIENT_ID",
    "FACEBOOK_CLIENT_ID",
    "FACEBOOK_CLIENT_SECRET",
    "FACEBOOK_URL",
    "JWT_EXPIRES_IN",
    "USER_SERVICE_URL",
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new APIError(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    logLevel: process.env.LOG_LEVEL,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_url: process.env.REDIRECT_URL,
    rabbitMQ: process.env.RABBITMQ_ENDPOINT,
    clientUrl: process.env.CLIENT_URL,
    facebook_id: process.env.FACEBOOK_CLIENT_ID,
    facebook_secret: process.env.FACEBOOK_CLIENT_SECRET,
    facebook_url: process.env.FACEBOOK_URL,
    apiGateway: process.env.API_GATEWAY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    user_service_url: process.env.USER_SERVICE_URL,
  };
}

const getConfig = (currentEnv: string = "development") => {
  const configPath =
    currentEnv === "development"
      ? path.join(__dirname, `../../configs/.env`)
      : path.join(__dirname, `../../configs/.env.${currentEnv}`);
  return createConfig(configPath);
};

export default getConfig;
