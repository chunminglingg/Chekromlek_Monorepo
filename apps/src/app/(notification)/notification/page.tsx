"use client";
import NotificationCardList from "@/components/Molecules/Cards/notificationCardList";
import UserMaintenance from "@/components/Molecules/fix/UserMaintenance";
import { Alert } from "@/components/Molecules/fix/alert";
import React, { useState } from "react";

export interface NotificationUserProps {
  id: string;
  userName: string;
  image: string;
  description: string;
}

const NotificationPage = () => {

  return (
    <>
    <div className="w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[60%] flex-row items-center justify-center max-md:mt-[3%] max-lg:mt-[2%] ">
      <div className="flex flex-col ">
        <div className="text-gray-600 text-[26px] flex mt-20 pl-2 pt-2 font-semibold">
          Notification
        </div>
        <div className="flex mt-5">
          <div className=" text-gray-600 text-base font-semibold pl-4 "></div>
        </div>
        <NotificationCardList />

        <NotificationCardList />
      </div>
      {/* <UserMaintenance/> */}
      </div>
    </>
  );
};

export default NotificationPage;
