import { createQueueConnection } from "@post/queues/connection.queue";
import { publishDirectMessage } from "@post/queues/post.producer";
import { Channel } from "amqplib";

export class NotificationService {
  private static notificationServiceInstance: NotificationService;
  constructor() {}
  static getInstance(): NotificationService {
    if (!this.notificationServiceInstance) {
      this.notificationServiceInstance = new NotificationService();
    }
    return this.notificationServiceInstance;
  }

  public async notifyUser(
    type: "like" | "answer",
    postOwnerId: string,
    _username: string,
    message: string,
    template: string
  ) {
    let channel: Channel | undefined;

    channel = await createQueueConnection();
    if (!channel) {
      throw new Error("Failed to establish queue connection");
    }

    const exchangeName = "chekromlek-notification";
    const routingKey = "post-notification";
    const msg = JSON.stringify({
      type,
      title: `New ${type}`,
      message,
      timestamp: new Date(),
      template,
      receiver: postOwnerId,
    });

    await publishDirectMessage(
      channel,
      exchangeName,
      routingKey,
      msg,
      `${type.charAt(0).toUpperCase() + type.slice(1)} notification sent`
    );
  }
}
