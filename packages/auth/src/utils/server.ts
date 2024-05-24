import { Channel } from "amqplib";
import { app } from "../app";
import { createQueueConnection } from "../queues/connection";
import getConfig from "./config";
import connectMongoDB from "./dbconnection";
import { logInit, logger } from "./logger";
export let authChannel: Channel;

export async function run() {
  try {
    const config = getConfig(process.env.NODE_ENV);

    // Activate Logger
    logInit({ env: process.env.NODE_ENV, logLevel: config.logLevel });

    // Activate Database
    const mongodb = connectMongoDB.getInstance();
    await mongodb.connect({ url: config.mongoUrl! });

    // Activate RabbitMQ
    authChannel = (await createQueueConnection()) as Channel;

    // Start Server
    const server = app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          // Close Database
          await mongodb.disconnect();
          logger.info("mongodb disconnected!");

          // Gracefully Terminate
          logger.info("server closed!");
          process.exit(1); // terminate the process due to error
        });
      } else {
        await mongodb.disconnect(); // In case the server isn't running but DB needs to be disconnected
        logger.info("MongoDB disconnected.");
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("unhandled error", { error });
      exitHandler();
    };

    // Error that might occur duing execution that not caught by any try/catch blocks
    process.on("uncaughtException", unexpectedErrorHandler); // Syncronous
    process.on("unhandledRejection", unexpectedErrorHandler); // Asyncronous

    // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        // Stop the server from accepting new request but keeps existing connection open until all ongoin request are done
        server.close();
      }
    });
  } catch (error) {
    logger.error("Failed to initialize application", { error });
    process.exit(1);
  }
}
