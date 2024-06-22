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
    userId: string,
    username: string,
    message: string,
    template: string,
    createdAt?: Date
  ) {
    try {
      let channel: Channel | undefined;

      channel = await createQueueConnection();
      if (!channel) {
        throw new Error("Failed to establish queue connection");
      }

      const exchangeName = "chekromlek-notification";
      const routingKey = "post-notification";
      const msg = JSON.stringify({
        type,
        title: `New ${type.replace("_", " ")}`,
        message: `${username}: ${message}`, // Include username in the message
        timestamp: new Date(),
        template,
        receiver: userId,
        createdAt,
      });

      await publishDirectMessage(
        channel,
        exchangeName,
        routingKey,
        msg,
        `${type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")} notification sent`
      );
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }
}
