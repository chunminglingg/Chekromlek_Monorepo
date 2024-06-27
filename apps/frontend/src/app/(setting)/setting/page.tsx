"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Switch from "@mui/material/Switch";
import { AnyCnameRecord } from "dns";

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
    // Implement logic to change the language
  };

  // Function to get the flag image URL based on the selected language
  const getFlagImage = (language: any) => {
    switch (language) {
      case "en":
        return "/icons/english.svg";
      case "kh":
        return "/icons/khmer.svg";
      // Add more cases for other languages
      default:
        return "";
    }
  };

  return (
    <div className="w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[60%] flex-row items-center justify-center max-md:mt-[3%] max-lg:mt-[2%] ">
      {/* User Setting */}

      <p className="text-gray-600 text-[26px] flex mt-20 pl-2 pt-5 font-semibold ">
        User Setting
      </p>

      {/* Account */}
      <Link href={"/setting/account"}>
        <button className="mt-[4%] w-full h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/account.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <p className="items-center justify-center text-[18px]">Account</p>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link>

      {/* Notification */}
      <Link href={"/setting/notification"}>
        <button className="mt-[3%] w-full h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/notifi.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <p className="items-center justify-center text-[18px]">
              Notification
            </p>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link>

      {/* Language Dropdown */}
      {/* <Link href={"/setting/language"}>
        <button className="mt-[3%] w-full h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/globle.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <p className="items-center justify-center text-[18px]">
              Language
            </p>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link> */}

      {/* Dark Mode */}
      {/* <button className="mt-[2%] w-full h-[70px] max-sm:h-[60px] flex-row flex gap-3 items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
        <div className="flex items-center justify-start gap-1">
          <Image
            src={"/icons/dark.svg"}
            alt="setting_icon"
            width={24}
            height={24}
          />
          <p className="items-center justify-center text-[18px]">Dark Mode</p>
        </div>
         <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        /> 
      </button>*/}

      {/* Help */}
      <Link href={"/setting/help"}>
        <button className="mt-[2%] w-full h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <Image
              src={"/icons/help.svg"}
              alt="setting_icon"
              width={24}
              height={24}
            />
            <p className="items-center justify-center text-[18px]">Help</p>
          </div>
          <Image src={"/icons/go_on.svg"} alt="goon" width={17} height={17} />
        </button>
      </Link>

      {/* Switch Account */}
      {/* <Link href={"/login"}>
        <button className="mt-[4%] mb-[2%] w-full h-[70px] max-sm:h-[60px] flex-row flex items-center justify-between border rounded-md shadow-sm p-5 hover:bg-gray-50">
          <div className="flex items-center justify-start gap-1">
            <p className="items-center justify-center text-[18px]">
              Switch Account
            </p>
          </div>
          <Image
            src={"/icons/switch.svg"}
            alt="setting_icon"
            width={24}
            height={24}
          />
        </button>
      </Link> */}
    </div>
  );
}
