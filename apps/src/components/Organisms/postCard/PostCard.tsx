"use client";
import React, { useState } from "react";
import Image from "next/image";
import Like from "@/components/Atoms/Like/Like";
import Saved from "@/components/Atoms/Saved/Saved";
import Link from "next/link";
import { EditCard } from "./EditCard";
import { Button } from "@/components/Atoms/Button/Button";
import { Typography } from "@/components/Atoms";

interface postCardProps {
  id: string;
  profile: string;
  username: string;
  hour: number;
  title?: string;
  caption?: string;
  postImage?: string | undefined;
}

const PostCard: React.FC<postCardProps> = ({
  id,
  profile,
  username,
  hour,
  caption,
  title,
  postImage,
}) => {
  // Calculate the height dynamically based on whether postImage is provided
  const cardHeight = postImage ? "h-[100%]" : "h-[100%]";

  // State to track whether the caption is truncated
  const [isCaptionTruncated, setIsCaptionTruncated] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the truncation of the caption
  const toggleCaptionTruncation = () => {
    setIsCaptionTruncated(!isCaptionTruncated);
  };

  const hideCard = () => {
    setIsVisible(false);
  };

  // Function to truncate the caption if it exceeds a certain number of characters
  const truncateCaption = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Maximum length for the caption before truncation
  const maxCaptionLength = 100;

  return (
    <div className="flex flex-col gap-2 justify-center items-center border rounded-md w-[663px] max-sm:w-[345px]">
      {isVisible && (
        <div
          className={`card w-[663px] max-sm:w-[300px] ${cardHeight} flex justify-center items-center rounded-md `}
        >
          <div className="card-items w-[630px] max-sm:w-[300px]flex flex-col gap-2 justify-between">
            <div className="card-header flex flex-row justify-between mt-4">
              <div className="profile flex flex-row gap-2">
                <div className="avatar w-[42px] h-[42px] rounded-full ">
                  <Image
                    alt="avatar"
                    src={profile}
                    height={42}
                    width={42}
                    className="rounded-full"
                  />
                </div>
                <div className="Name&Time ">
                  <h3 className="font-medium text-[16px] text-[#343A40]">
                    {username}
                  </h3>
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

              <EditCard onHide={hideCard} />
            </div>
            <div className="card-content flex flex-col gap-2 ">
              <div className="mt-1 items-start ">
                <Typography fontSize="title" align="left">
                {title}
              </Typography>
              </div>
              <p className="text-[14px] text-[#343A40] font-light">
                {isCaptionTruncated
                  ? truncateCaption(caption || "", maxCaptionLength)
                  : caption}
                {caption && caption.length > maxCaptionLength && (
                  <button
                    className="text-[14px] text-[#6d8fd2] font-medium underline cursor-pointer ml-1"
                    onClick={toggleCaptionTruncation}
                  >
                    {isCaptionTruncated ? " See more" : "See less"}
                  </button>
                )}
              </p>
              {postImage && (
                <div className="w-[100%] h-full md:w-[100%] flex  border-b p-2 mb-2 ">
                  <Image
                    alt="content post"
                    src={postImage}
                    width={320}
                    height={320}
                    className="flex w-full h-full aspect-ratio-16/9 "
                  />
                </div>
              )}
            </div>

            <div className="card-footer flex flex-col justify-center items-start gap-2 mb-3 ">
              {/* Footer content */}
              <div className="card-items-footer w-[100%] flex flex-row justify-between items-center">
               {/* Like */}
                <div className=" flex flex-row justify-between items-center gap-6">
                  <div className="like">
                    <Like />
                  </div>
                  {/* Save */}
                  <div className="Saved">
                    <Saved />
                  </div>
                </div>
                {/* Answer */}
                <div className="right-item ">
                  <Link href={`/post/${id}`}>      
                    <Button className=" relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#7B2CBF] to-[#D600E8] rounded-xl" />
                      <div className=" px-6 py-[9px]  bg-white rounded-xl flex flex-row gap-2  relative group transition duration-200 text-white hover:bg-gray-100">
                        <p className="text-black text-[14px]">Answer</p>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
