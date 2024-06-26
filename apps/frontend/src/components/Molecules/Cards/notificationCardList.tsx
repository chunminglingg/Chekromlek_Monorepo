"use client";
import React from "react";
import { NotificationCard } from "./notificationCard";

const items = [
  {
    id: "1",
    image: "/card-svg/avatar.svg",
    userName: "Kimlang Tieng",
  },
  {
    id: "2",
    image: "/card-svg/avatar.svg",
    userName: "Tan Hanshangpho",
  },
  {
    id: "3",
    image: "/card-svg/avatar.svg",
    userName: "Sokleng",
  },
];

const NotificationCardList = () => {
  return (
    <div>
      {items.map((item) => (
        <NotificationCard
          key={item.id}
          image={item.image}
          userName={item.userName}
          id={item.id}
        />
      ))}
    </div>
  );
};
export default NotificationCardList;
