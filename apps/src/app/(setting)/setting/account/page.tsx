"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components";

export default function page() {
  return (
    <div className="w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[50%] flex-row items-center justify-center mt-[8%] max-md:mt-[12%] max-sm:mt-[20%] max-lg:mt-[10%] ">
      {/* User Setting */}
      <Link href={"/setting"}>
        <div className="flex items-end justify-start border-b-2 py-2 border-gray-300  gap-2 ml-[97px]">
          <Image
            src={"/icons/arrow-back.svg"}
            alt="setting_icon"
            width={25}
            height={25}
          />
          <Typography fontSize="title">Account</Typography>
        </div>
      </Link>
      {/* Change Name */}
      <Link href={"/setting/account/changename"}>
        <button className="mt-[6%] w-[460px] h-[70px] max-sm:h-[60px] ml-[97px] flex-row flex items-center justify-between  border rounded-md shadow-md p-5 hover:bg-slate-50">
          <div className="flex items-center justify-start gap-1">
            <Typography
              fontSize="caption"
              className="items-center justify-center"
            >
              Change Name
            </Typography>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link>
      {/* Change Password */}
      <Link href={"/setting/account/changepassword"}>
        <button className="mt-[3%] w-[460px] ml-[97px] h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between  border rounded-md shadow-md p-5 hover:bg-slate-50">
          <div className="flex items-center justify-start gap-1">
            <Typography
              fontSize="caption"
              className="items-center justify-center"
            >
              Change Password
            </Typography>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link>
      {/* Change Email */}
    </div>
  );
}
