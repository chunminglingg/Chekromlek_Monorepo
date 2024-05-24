
import getConfig from './config';
import EmailSender from './email-sender';
import { logInit, logger } from './logger';
import NodemailerEmailApi from './nodemailer-email-api';
import { app } from '../app';
import { startQueue } from '@notifications/queues/connection';

export async function run() {
  try {
    const config = getConfig();

    // Activate Logger
    logInit({ env: process.env.NODE_ENV, logLevel: config.logLevel });

    // Activate Email Sender with EmailAPI [NodeMailer]
    const emailSender = EmailSender.getInstance();
    emailSender.activate();
    emailSender.setEmailApi(new NodemailerEmailApi());

    // Activate RabbitMQ
    await startQueue();

    logger.info(
      `Worker with process id of ${process.pid} on notification server has started.`
    );
    // Start Server
    const server = app.listen(config.port, () => {
      logger.info(`Notification Server is listening on port: ${config.port}`);
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info('server closed!');

          // Gracefully Terminate
          process.exit(1); // terminate the process due to error
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      logger.error(`unhandled error, ${error}`);
      exitHandler();
    };

    // Error that might occur duing execution that not caught by any try/catch blocks
    process.on('uncaughtException', unexpectedErrorHandler); // Syncronous
    process.on('unhandledRejection', unexpectedErrorHandler); // Asyncronous

    // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        // Stop the server from accepting new request but keeps existing connection open until all ongoin request are done
        server.close();
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(`Failed to initialize application ${error}`);
    process.exit(1);
  }
}
