import { logger } from '@notifications/utils/logger';
import { SocketSender } from '@notifications/utils/socket-sender';
import { Channel, ConsumeMessage } from 'amqplib';
import { createQueueConnection } from './connection';

export interface IMessageLocals {
  type: string;
  title: string;
  message: string;
  timestamp: Date;
}

async function handleNotification(notification: any): Promise<void> {
  const { eventType, eventData } = notification;

  const messageDetailsLocals: IMessageLocals = {
    type: eventType,
    title: '',
    message: '',
    timestamp: new Date(),
  };

  switch (eventType) {
    case 'PostLiked':
      messageDetailsLocals.title = 'Your post was liked!';
      messageDetailsLocals.message = `User ${eventData.userId} liked your post.`;
      await SocketSender.getInstance().sendNotification(
        'PostLiked',
        eventData.postOwnerId,
        messageDetailsLocals,
      );
      break;
    case 'PostAnswered':
      messageDetailsLocals.title = 'New answer to your post!';
      messageDetailsLocals.message = `User ${eventData.userId} answered your post.`;
      await SocketSender.getInstance().sendNotification(
        'PostAnswered',
        eventData.postOwnerId,
        messageDetailsLocals,
      );
      break;
    case 'AnswerLiked':
      messageDetailsLocals.title = 'Your answer was liked!';
      messageDetailsLocals.message = `User ${eventData.userId} liked your answer.`;
      await SocketSender.getInstance().sendNotification(
        'AnswerLiked',
        eventData.answerOwnerId,
        messageDetailsLocals,
      );
      break;
    default:
      logger.warn(`Unknown event type: ${eventType}`);
  }
}

export async function consumeNotificationMessages(
  channel: Channel,
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createQueueConnection()) as Channel;
    }
    const exchangeName = 'chekromlek-notification';
    const routingKey = 'post-notification';
    const queueName = 'post-notification-queue';
    if (channel) {
      await channel.assertExchange(exchangeName, 'direct');
      const queue = await channel.assertQueue(queueName, {
        durable: true,
        autoDelete: false,
      });
      await channel.bindQueue(queue.queue, exchangeName, routingKey);
      channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
        if (msg) {
          const notification = JSON.parse(msg.content.toString());
          await handleNotification(notification);
          channel.ack(msg);
        }
      });
    }
  } catch (error) {
    logger.error('Channel is undefined in consumeNotificationMessages');
    logger.error(
      `NotificationService EmailConsumer consumeNotificationMessages() method error: ${error}`,
    );
  }
}
