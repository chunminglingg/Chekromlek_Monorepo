import { logger } from '@notifications/utils/logger';
import { createQueueConnection } from './connection';
import getConfig from '@notifications/utils/config';
import { Channel, ConsumeMessage } from 'amqplib';
import { IEmailLocals } from '@notifications/utils/@types/email-sender.types';
import EmailSender from '@notifications/utils/email-sender';
import { SocketSender } from '@notifications/utils/socket-sender';

// TODO:
// 1. Check If Channel Exist. If Not Create Once
// 2. Define ExchangeName, RoutingKey, QueueName
// 3. Check if Exchange Exist, If Not Create Once
// 4. Check if Queue Exist, If Not Create Once
// 5. Bind the Exchange to Queue by Routing Key
// 6. Consumer: Send Email When there is a message from Queue

export async function consumeAuthEmailMessages(
  channel: Channel,
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createQueueConnection()) as Channel;
    }

    const exchangeName = 'chekromlek-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';
    if (channel) {
      await channel.assertExchange(exchangeName, 'direct');
      const queue = await channel.assertQueue(queueName, {
        durable: true,
        autoDelete: false,
      });
      await channel.bindQueue(queue.queue, exchangeName, routingKey);

      channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
        const { receiverEmail, username, resetLink, template, verifyLink } =
          JSON.parse(msg!.content.toString());

        // const locals: IEmailLocals = {
        //   appLink: `${getConfig().clientUrl}`,
        //   appIcon: ``,
        //   username,
        //   verifyLink: `${getConfig().clientUrl}/signup/get-verified?token=${verifyLink}`,
        //   resetLink,
        // };

        let locals: IEmailLocals;
        switch (template) {
          case 'verifyEmail':
            locals = {
              token: verifyLink,
              appLink: `${getConfig().clientUrl}`,
              appIcon: ``,
              username,
              verifyLink: `${getConfig().clientUrl}/signup/get-verified?token=${verifyLink}`,
              resetLink,
            };
            break;
          case 'forgotPassword':
            locals = {
              appLink: `${getConfig().clientUrl}`,
              appIcon: ``,
              username,
              resetLink: `${getConfig().clientUrl}`,
            };
            break;
          case 'resetPassword':
            locals = {
              appLink: `${getConfig().clientUrl}`,
              appIcon: ``,
              username,
            };
            break;
          default:
            logger.error(`Unknown template: ${template}`);
            return;
        }

        const emailUserSender = EmailSender.getInstance();

        await emailUserSender.sendEmail(template, receiverEmail, locals);

        channel.ack(msg!);
      });
    }
  } catch (error) {
    logger.error('Channel is undefined in consumeAuthEmailMessages');
    logger.error(
      `NotificationService EmailConsumer consumeAuthEmailMessages() method error: ${error}`,
    );
  }
}

// export async function consumeNotificationMessages(
//   channel: Channel,
// ): Promise<void> {
//   try {
//     if (!channel) {
//       channel = (await createQueueConnection()) as Channel;
//     }
//     const exchangeName = 'chekromlek-notification';
//     const routingKey = 'post-notification';
//     const queueName = 'post-notification-queue';
//     if (channel) {
//       await channel.assertExchange(exchangeName, 'direct');
//       const queue = await channel.assertQueue(queueName, {
//         durable: true,
//         autoDelete: false,
//       });
//       await channel.bindQueue(queue.queue, exchangeName, routingKey);
//       channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
//         if (msg) {
//           const { type, title, message, timestamp, template, receiver } =
//             JSON.parse(msg.content.toString());

//           const messageDetailsLocals = {
//             type,
//             title,
//             message,
//             timestamp,
//           };
//           const notificationUserSender = SocketSender.getInstance();
//           await notificationUserSender.sendNotification(
//             template,
//             receiver,
//             messageDetailsLocals,
//           );
//           channel.ack(msg);
//         }
//       });
//     }
//   } catch (error) {
//     logger.error('Channel is undefined in consumeNotificationMessages');
//     logger.error(
//       `NotificationService EmailConsumer consumeNotificationMessages() method error: ${error}`,
//     );
//   }
// }

export interface IMessageLocals {
  type: string;
  title: string;
  message: string;
  timestamp: Date; // Ensure timestamp is of type Date
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
          await handleNotification(notification); // Process notification
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
