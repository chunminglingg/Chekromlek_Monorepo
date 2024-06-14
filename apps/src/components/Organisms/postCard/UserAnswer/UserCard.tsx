"use client";
import React, { useState } from "react";
import Image from "next/image";
import Like from "@/components/Atoms/Like/Like";

interface UserCardProps {
  profile: string;
  username: string;
  hour: number;
  caption: string;
  postImage?: string | undefined;
}

const UserCard: React.FC<UserCardProps> = ({
  profile,
  username,
  hour,
  caption,
  postImage,
}) => {
  // State to track whether the caption is truncated
  const [isCaptionTruncated, setIsCaptionTruncated] = useState(true);

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
  return (
    <div className="m-auto">
      <div className="mt-[2%] w-[420px] max-sm:w-[310px] h-auto max-sm:mt-[5%] min-md:mt-[10%] max-sm:border-none ">
        <div className="flex items-center justify-between ">
          {/* Profile */}
          <div className="flex items-center">
            <Image
              src={profile}
              width={42}
              height={42}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
            {/* Detail */}
            <div className="ml-2 flex flex-col gap-0">
              <p className="font-medium text-[16px] text-gray-900">
                {username}
              </p>
              <p className="text-[12px] text-gray-500">
                update {hour} hour ago
              </p>
            </div>
          </div>
        </div>
        {/* Caption */}
        <div className="card-content flex flex-col gap-2 items-center justify-center mt-1 ms-2">
          {/* Render truncated caption with "See more" link */}
          <p className="text-[14px] text-[#6C757D]">
            {isCaptionTruncated
              ? truncateCaption(caption || "", maxCaptionLength)
              : caption}
            {caption && caption.length > maxCaptionLength && (
              <button
                className="text-[14px] text-[#4b81ed] font-medium underline cursor-pointer ml-1"
                onClick={toggleCaptionTruncation}
              >
                {isCaptionTruncated ? " See more" : "See less"}
              </button>
            )}
          </p>
          {postImage && (
            <div className="w-[320px] h-[320px] rounded-md">
              <Image
                alt="content post"
                src={postImage}
                width={320}
                height={320}
              />
            </div>
          )}
        </div>
        {/* Footer */}
        <div className=" mb-[2%] ms-1 border-t rounded-sm border-gray-300 "></div>
        <div className="flex items-end justify-end gap-2 mb-1 ms-1">
          <div className="like">
            <Like like={0} />
          </div>
        </div>
      </div>
    </div>
  );
};
export { UserCard };
