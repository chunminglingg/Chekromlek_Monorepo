import { Channel } from "amqplib";
import { createQueueConnection } from "./connection.queue";
import { logger } from "../utils/logger";
interface NotificationTemplate {
  exchangeName: string;
  routingKey: string;
  logMessage: string;
}
export async function publishDirectMessage(
  channel: Channel,
  template: NotificationTemplate,
  message: string
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createQueueConnection()) as Channel;
    }
    logger.info(
      `ExchangeName: ${template.exchangeName}, routingKey: ${template.routingKey}, message: ${message}`
    );
    await channel.assertExchange(template.exchangeName, "direct");
    channel.publish(
      template.exchangeName,
      template.routingKey,
      Buffer.from(message)
    );
    logger.info(template.logMessage);
  } catch (error) {
    logger.error(`Error in publishDirectMessage() method`, error);
  }
}
