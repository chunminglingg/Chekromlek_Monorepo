import React from "react";
import Image from "next/image";
import { Typography } from "@/components/Atoms";
interface ButtonCategoriesProps {
  title: string;
  description: string;
  icon: string;
}
const ButtonCategories: React.FC<ButtonCategoriesProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className=" mt-2 ">
      <div className=" w-[250] lg:m-auto flex">
        <button className=" flex-1 w-[250px] lg:w-[450px] lg:h-[100px] m-2 h-[80px] px-[3px] flex items-center justify-between rounded-[16px] border border-gray-200 max-sm:justify-center hover:bg-gray-50">
          <div className="flex gap-4 max-sm:justify-center">
            <Image
              src={icon}
              alt="categories-icon"
              width={50}
              height={50}
              className="ml-8"
            />
            <div className="flex flex-col">
              <Typography
                align="left"
                color="primary"
                fontSize="title"
                className=" items-start mt-1 text-[#7B2CBF] text-sm lg:text-base w-full max-w-[270px] whitespace-nowrap line-clamp-1">
                {title}
              </Typography>
              <Typography className="text-base text-zinc-400 max-md:hidden" fontSize="caption"  align="left">
                {description}
              </Typography>
            </div>
          </div>
          <div className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden sm:block"
            >
              <path d="M12 18L18 12L12 6" stroke="#222222" />
              <path d="M6 18L12 12L6 6" stroke="#222222" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonCategories;
