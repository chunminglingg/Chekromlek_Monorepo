import { Channel } from "amqplib";
import { createQueueConnection } from "./connection.queue";
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
    logger.info(
      `ExchangeName: ${exchangeName}, routingKey: ${routingKey}, message: ${message}`
    );
    await channel.assertExchange(exchangeName, "direct");
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    logger.info(logMessage);
  } catch (error) {
    logger.error(`Error in publishDirectMessage() method`, error);
  }
}
