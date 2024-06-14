"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Typography } from "@/components/Atoms";
import Link from "next/link";

export interface ViewPostProps {
  profile: string;
  username: string;
  hour: number;
  title?: string;
  description?: string;
  postImage?: string | undefined;
}

const ViewPost: React.FC<ViewPostProps> = ({
  profile,
  username,
  hour,
  title,
  description,
  postImage,
}) => {
  // State to track whether the caption is truncated
  const [isCaptionTruncated, setIsCaptionTruncated] = useState(true);

  // State to store the input value
  const [inputValue, setInputValue] = useState("");

  // State to track if the button has been clicked
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Function to toggle the truncation of the caption
  const toggleCaptionTruncation = () => {
    setIsCaptionTruncated(!isCaptionTruncated);
  };

  // Function to truncate the caption if it exceeds a certain number of characters
  const truncateCaption = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Maximum length for the caption before truncation
  const maxCaptionLength = 100;

  // Event handler to update the input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Event handler for input submission
  const handleInputSubmit = () => {
    // Perform your desired action with the input value
    console.log("answer:", inputValue);
    // Set the button click state to true
    setIsButtonClicked(true);
    // Clear the input after submission if desired
    setInputValue("");
    setTimeout(() => setIsButtonClicked(false), 1000);
  };

  // Event handler to submit input on pressing Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div className="w-auto max-sm:w-[315px] h-auto min-md:mt-[10%] p-2 max-sm:m-4">
      <div>
        <div className="flex items-center justify-between gap-5">
          {/* Profile */}
          <div className="flex items-center">
          <Link href={"/profile/"}>
            <Image
              src={profile}
              width={42}
              height={42}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
            </Link>
            {/* Detail */}
            <div className="ml-2 ">
            <Link href={"/profile/"}>
              <h3 className="font-medium text-[16px] text-[#343A40]">
                {username}
              </h3>
              </Link>
              <div className="flex flex-row gap-1">
                <Image
                  src={"/icons/time.svg"}
                  alt="time"
                  width={13}
                  height={13}
                />
                <p className="font-normal text-[12px] text-[#6C757D]">
                  {hour} hour ago
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Caption */}
        <div className="card-content flex flex-col gap-4  pt-2 pb-2">
          {/* Render truncated caption with "See more" link */}
          {/* #tittle */}
          <div className=" mt-1 w-auto title font-semibold text-[#343A40] text-2xl hover:underline max-sm:text-lg max-sm:font-medium pt-2 hover:cursor-pointer break-words">
            <Typography fontSize="title" align="left" className="">
              {title}
            </Typography>
          </div>
          <p className="text-[18px] text-[#6C757D] font-medium break-words">
            {isCaptionTruncated
              ? truncateCaption(description || "", maxCaptionLength)
              : description}
            {description && description.length > maxCaptionLength && (
              <button
                className="text-[14px] text-[#4b81ed] font-medium underline cursor-pointer ml-1"
                onClick={toggleCaptionTruncation}
              >
                {isCaptionTruncated ? " See more" : "See less"}
              </button>
            )}
          </p>
          {postImage && (
            <div className="w-[100%] h-full md:w-[100%] flex justify-center items-center">
              <Image
                alt="content post"
                src={postImage}
                width={320}
                height={420}
                className="rounded-md"
              />
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="h-[47px] flex items-center justify-center border rounded-md">
          <input
            type="text"
            placeholder="Answer question..."
            className="w-full px-2 py-2 text-[#6C757D] rounded-md focus:outline-none text-sm"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleInputSubmit}>
            <Image
              alt="post"
              src={isButtonClicked ? "/icons/done.svg" : "/icons/sent.svg"}
              width={38}
              height={38}
              className="-translate-x-3"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
