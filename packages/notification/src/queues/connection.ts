import getConfig from '@notifications/utils/config';
import client, { Channel, Connection } from 'amqplib';
import { consumeAuthEmailMessages } from './email-consumer';
import { logger } from '@notifications/utils/logger';


export async function createQueueConnection(): Promise<Channel | undefined> {
  try {
    console.log("Hello from RabbitMQ")
    const connection: Connection = await client.connect(
      `${getConfig().rabbitMQ}`
    );
    const channel: Channel = await connection.createChannel();
    logger.info('Nofiication server connected to queue successfully...');
    closeQueueConnection();
    return channel;
  } catch (error) {
    console.log("Error creating queue connection : ", error);
    
    logger.error(
      `NotificationService createConnection() method error: ${error}`
    );
    return undefined;
  }
}

function closeQueueConnection() {
  process.once(
    'SIGINT',
    async (channel: Channel, connection: Connection): Promise<void> => {
      await channel.close();
      await connection.close();
    }
  );
}

export async function startQueue(): Promise<void> {
  try {
    const emailChannel: Channel = (await createQueueConnection()) as Channel;
    await consumeAuthEmailMessages(emailChannel);
  } catch (error) {
    logger.error(
      `NotificationService startQueue() method error: ${error}`
    );
    throw error; // Re-throw for handling at a higher level
  } finally {
    await closeQueueConnection(); // Ensure connection is closed
  }
}
