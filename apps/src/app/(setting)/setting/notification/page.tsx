'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components";
// import Switch from "@mui/material/Switch";

export default function Page() {
  const [newPostsChecked, setNewPostsChecked] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const handleNewPostsChange = () => {
    setNewPostsChecked((prev) => !prev);
  };

  const handleAnswerChange = () => {
    setAnswerChecked((prev) => !prev);
  };

  return (
    <div className="w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[50%] flex-row items-center justify-center mt-[8%] max-md:mt-[12%] max-sm:mt-[20%] max-lg:mt-[10%] ">
      {/* User Setting */}
      <Link href={"/setting"}>
        <div className="flex items-end ml-[98px] justify-start border-b-2 py-2 border-gray-300  gap-2 ">
          <Image
            src={"/icons/arrow-back.svg"}
            alt="setting_icon"
            width={24}
            height={24}
          />
          <Typography fontSize="title" className="items-center justify-center" >Notification</Typography>
        </div>
      </Link>

      {/* New Posts */}
        <button className="mt-[6%] lg:ml-[98px] lg:w-[460px] h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between  border rounded-md shadow-md p-2 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/img_post.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <div className="flex flex-col items-start justify-start ms-2">
              <p className="items-start justify-start text-[18px]">
                New Posts
              </p>
              <Typography color="secondary" className="items-center justify-center text-[10px]">These all notification from new post</Typography>
            </div>
          </div>
          {/* <Switch
            checked={newPostsChecked}
            onChange={handleNewPostsChange}
            inputProps={{ "aria-label": "controlled" }}
          /> */}
        </button>

      {/* Answer */}
        <button className="mt-[3%] lg:ml-[98px] lg:w-[460px] h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between  border rounded-md shadow-md p-2 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/chat.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <div className="flex flex-col items-start justify-start ms-2">
              <p className="items-start justify-start text-[18px]">Answer</p>
              <Typography color="secondary" className="items-center justify-center text-[10px]">These all notification from new answer</Typography>
            </div>
          </div>
          {/* <Switch
            checked={answerChecked}
            onChange={handleAnswerChange}
            inputProps={{ "aria-label": "controlled" }}
          /> */}

        </button>
    </div>
  );
}
