"use client";
import React, { useState } from "react";
import Image from "next/image";

interface NotificationCardProps {
  id: string;
  image: string;
  userName: string;
  selectCard?: string | null;
  onSelectCard?: (id: string) => void;
  badge?: string;
}

const NotificationCard = ({
  id,
  image,
  userName,
  onSelectCard,
  badge = "new",
}: NotificationCardProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    if (!isSelected) {
      setIsSelected(true);
    }
    if (onSelectCard) {
      onSelectCard(id);
    }
  };

  return (
    <>
      <div
        className={`cursor-pointer my-1 container justify-center items-center rounded-md hover:bg-[#e9ecef] 
        ${
          isSelected ? "bg-[#fdfdfd]" : "border shadow-md rounded-md"
        } border-gray-200 p-4  md:w-[450px] max-sm:w-[340px] relative flex`}
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <div className="mr-3">
            <Image
              src={image}
              alt="user-profile"
              width={60}
              height={60}
              className=" rounded-full object-cover"
            />
          </div>
          <div className="flex justify-center items-center mr-9 relative">
            <div className="line-clamp-1 md:line-clamp-2 overflow-hidden">
              <p>
                <span className="font-semibold text-[#33363F] text-base max-sm:text-sm">
                  {userName}
                </span>
                <span className="text-[#6C757D] text-base font-normal animation-marquee-10s linear infinite max-sm:text-sm">
                  , has answer to question you posted!
                </span>
              </p>
            </div>
            <div>
              {badge && (
                <div
                  className={`${
                    isSelected ? "hidden" : ""
                  } bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full absolute top-2 md:top-0 left-1'`}
                >
                  {badge}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { NotificationCard };
