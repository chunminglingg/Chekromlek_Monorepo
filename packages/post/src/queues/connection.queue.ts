import getConfig from "@post/utils/config";
import { logger } from "@post/utils/logger";
import client, { Channel, Connection } from "amqplib";

export async function createQueueConnection(): Promise<Channel | undefined> {
  try {
    const currentEnv = process.env.NODE_ENV || "development";
    const config = getConfig(currentEnv);
    const rabbitMQUrl = config.rabbitMQ;

    // Check if RabbitMQ URL is defined
    if (!rabbitMQUrl) {
      throw new Error("RabbitMQ URL is not defined in the configuration");
    }
    const connection: Connection = await client.connect(rabbitMQUrl);
    const channel: Channel = await connection.createChannel();
    logger.info("Connected to queue successfully...");
    closeQueueConnection(channel, connection);
    return channel;
  } catch (error) {
    logger.error(`Error in createQueueConnection() method: ${error}`);
    return undefined;
  }
}

export async function closeQueueConnection(
  channel: Channel,
  connection: Connection
): Promise<void> {
  process.once("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}
