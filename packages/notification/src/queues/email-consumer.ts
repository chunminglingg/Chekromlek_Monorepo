import { logger } from '@notifications/utils/logger';
import { createQueueConnection } from './connection';
import getConfig from '@notifications/utils/config';
import { Channel, ConsumeMessage } from 'amqplib';
import { IEmailLocals } from '@notifications/utils/@types/email-sender.types';
import EmailSender from '@notifications/utils/email-sender';

// TODO:
// 1. Check If Channel Exist. If Not Create Once
// 2. Define ExchangeName, RoutingKey, QueueName
// 3. Check if Exchange Exist, If Not Create Once
// 4. Check if Queue Exist, If Not Create Once
// 5. Bind the Exchange to Queue by Routing Key
// 6. Consumer: Send Email When there is a message from Queue

export async function consumeAuthEmailMessages(
  channel: Channel
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
        const { receiverEmail, username, resetLink, template , verifyLink} =
          JSON.parse(msg!.content.toString());

        const locals: IEmailLocals = {
          appLink: `${getConfig().clientUrl}`,
          appIcon: ``,
          username,
          verifyLink: `http://localhost:3003/verify?token=${verifyLink}`,
          resetLink,
        };

        const emailUserSender = EmailSender.getInstance();
        await emailUserSender.sendEmail(template, receiverEmail, locals);

        channel.ack(msg!);
      });
    }
  } catch (error) {
    logger.error('Channel is undefined in consumeAuthEmailMessages');
    logger.error(
      `NotificationService EmailConsumer consumeAuthEmailMessages() method error: ${error}`
    );
  }
}

// export async function consumeSubmissionEmailMessages(
//   channel: Channel
// ): Promise<void> {
//   try {
//     if (!channel) {
//       channel = (await createQueueConnection()) as Channel;
//     }

//     const exchangeName = 'microsample-submission-notification';
//     const routingKey = 'submission-email';
//     const queueName = 'submission-email-queue';

//     await channel.assertExchange(exchangeName, 'direct');
//     const queue = await channel.assertQueue(queueName, {
//       durable: true,
//       autoDelete: false,
//     });
//     await channel.bindQueue(queue.queue, exchangeName, routingKey);

//     channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {

//     });
//   } catch (error) {
//     logger.error(
//       `NotificationService EmailConsumer consumeAuthEmailMessages() method error: ${error}`
//     );
//   }
// }
