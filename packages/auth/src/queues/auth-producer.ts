import { Channel } from "amqplib";
import { createQueueConnection } from "./connection";
import { logger } from "../utils/logger";

export async function publishDirectMessage(
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createQueueConnection()) as Channel;
    }

    await channel.assertExchange(exchangeName, "direct");
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    logger.info(logMessage);
  } catch (error) {
    logger.error(
      `AuthService Provider publishDirectMessage() method error`,
      error
    );
  }
}
