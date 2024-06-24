import { createQueueConnection } from "@post/queues/connection.queue";

import { publishDirectMessage } from "@post/queues/post-producer";
import { userChannel } from "@post/utils/server";

export class NotificationService {
  private static notificationServiceInstance: NotificationService;
  constructor() {}
  static getInstance(): NotificationService {
    if (!this.notificationServiceInstance) {
      this.notificationServiceInstance = new NotificationService();
    }
    return this.notificationServiceInstance;
  }

  async sendPostCreatedNotification(
    postId: string,
    userId: string
  ): Promise<void> {
    // const template: NotificationTemplate = {
    //   eventName: "PostCreated",
    //   exchangeName: "chekromlek-notification",
    //   routingKey: "post-notification",
    //   logMessage: `Notification sent for post creation (Post ID: ${postId})`,
    // };

    const messageDetails = JSON.stringify({
      eventType: "PostCreated",
      eventData: {
        postId,
        userId,
      },
    });

    await publishDirectMessage(
      userChannel,
      "chekromlek-notification",
      "post-notification",
      JSON.stringify(messageDetails),
      `Notification sent for answer creation (Post ID: ${postId})`
    );
  }

  async sendAnswerCreatedNotification(
    postId: string,
    userId: string,
    answerOwnerId: string
  ): Promise<void> {
    const channel = await createQueueConnection();
    if (!channel) {
      throw new Error("Failed to establish queue connection");
    }

    const messageDetails = JSON.stringify({
      eventType: "PostAnswered",
      eventData: {
        postId,
        userId,
        answerOwnerId,
      },
    });

    await publishDirectMessage(
      userChannel,
      "chekromlek-notification",
      "post-notification",
      JSON.stringify(messageDetails),
      `Notification sent for answer creation (Post ID: ${postId})`
    );
    // const template: NotificationTemplate = {
    //   eventName: "PostAnswered",
    //   exchangeName: "chekromlek-notification",
    //   routingKey: "post-notification",
    //   logMessage: `Notification sent for answer creation (Post ID: ${postId})`,
    // };

    // const message = JSON.stringify({
    //   eventType: "AnswerCreated",
    //   eventData: {
    //     postId,
    //     userId,
    //     answerOwnerId,
    //   },
    // });

    // await publishDirectMessage(channel, template, message);
  }
  // public async notifyUser(
  //   type: "like" | "answer",
  //   postOwnerId: string,
  //   _username: string,
  //   message: string,
  //   template: string
  // ) {
  //   let channel: Channel | undefined;

  //   channel = await createQueueConnection();
  //   if (!channel) {
  //     throw new Error("Failed to establish queue connection");
  //   }

  //   const exchangeName = "chekromlek-notification";
  //   const routingKey = "post-notification";
  //   const msg = JSON.stringify({
  //     type,
  //     title: `New ${type}`,
  //     message,
  //     timestamp: new Date(),
  //     template,
  //     receiver: postOwnerId,
  //   });

  //   await publishDirectMessage(
  //     channel,
  //     exchangeName,
  //     routingKey,
  //     msg,
  //     `${type.charAt(0).toUpperCase() + type.slice(1)} notification sent`
  //   );
  // }
}
