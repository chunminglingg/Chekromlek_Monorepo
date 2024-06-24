import React, { useEffect, useState } from "react";
import { NotificationCard } from "./notificationCard";

interface Notification {
  id: string;
  image: string;
  userName: string;
  message: string;
  timestamp: string;
  badge: string;
}

const NotificationCardList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://localhost:3002/notification");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          id={notification.id}
          image={notification.image}
          userName={notification.userName}
          // message={notification.message}
          // timestamp={notification.timestamp}
          badge={notification.badge}
        />
      ))}
    </div>
  );
};

export default NotificationCardList;
