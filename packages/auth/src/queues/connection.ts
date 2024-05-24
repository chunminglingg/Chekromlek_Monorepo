import client, { Channel, Connection } from "amqplib";
import getConfig from "../utils/config";
import { logger } from "../utils/logger";

export async function createQueueConnection(): Promise<Channel | undefined> {
  try {
    console.log(process.env.NODE_ENV)
    const config = getConfig(process.env.NODE_ENV);
    const connection: Connection = await client.connect(`${config.rabbitMQ}`);
    const channel: Channel = await connection.createChannel();
    logger.info("Auth Server connected to queue successfully...");
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    logger.error(`Auth Server error createQueueConnection() method: ${error}`);
    return undefined;
  }
}

export async function closeConnection(
  channel: Channel,
  connection: Connection
): Promise<void> {
  process.once("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}
