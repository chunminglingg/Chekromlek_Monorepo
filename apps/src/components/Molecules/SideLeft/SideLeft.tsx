"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";


interface SideStyleProps {
  // Define props here if you plan to pass any props to SideStyle component
}
const SideStyle = () => {
  const [isHomeClick, setIsHomeClick] = useState(false);
  const [isCategoryClick, setIsCategoryClick] = useState(false);
  const [isNotificationClick, setIsNotificationClick] = useState(false);
  const [isSettingClick, setIsSettingClick] = useState(false);

  const handleHomeClick = () => {
    setIsHomeClick(true);
    setIsCategoryClick(false);
    setIsNotificationClick(false);
    setIsSettingClick(false);
  };

  const handleCategoryClick = () => {
    setIsHomeClick(false);
    setIsCategoryClick(true);
    setIsNotificationClick(false);
    setIsSettingClick(false);
  };

  const handleNotificationClick = () => {
    setIsHomeClick(false);
    setIsCategoryClick(false);
    setIsNotificationClick(true);
    setIsSettingClick(false);
  };

  const handleSettingClick = () => {
    setIsHomeClick(false);
    setIsCategoryClick(false);
    setIsNotificationClick(false);
    setIsSettingClick(true);
  };

  return (
    <>
      <div className="home">
        <Link href={"/signup"}>
          <button
            onClick={handleHomeClick}
            className={`flex flex-row gap-2 items-${
              isHomeClick ? "center" : "start"
            } px-4 py-4 group rounded-xl w-[250px] ${
              isHomeClick ? "" : "hover:bg-gray-200"
            } text-${isHomeClick ? "violet-600 font-semibold" : "#343A40"}`}
          >
            <Image
              alt="home"
              src={`/sideleft/home/${isHomeClick ? "after" : "index"}.svg`}
              height={24}
              width={24}
            />
            <span>Home</span>
          </button>
        </Link>
      </div>
      <div className="category">
        <Link href={"/signup"}>
          <button
            onClick={handleCategoryClick}
            className={`flex flex-row gap-2 items-${
              isCategoryClick ? "center" : "start"
            } px-4 py-4 group rounded-xl w-[250px] ${
              isCategoryClick ? "" : "hover:bg-gray-200"
            } text-${isCategoryClick ? "violet-600 font-semibold" : "#343A40"}`}
          >
            <Image
              alt="category"
              src={`/sideleft/category/${
                isCategoryClick ? "after" : "index"
              }.svg`}
              height={24}
              width={24}
            />
            <span>Categories</span>
          </button>
        </Link>
      </div>
      <div className="notification">
        <Link href={"/signup"}>
          <button
            onClick={handleNotificationClick}
            className={`flex flex-row gap-2 items-${
              isNotificationClick ? "center" : "start"
            } px-4 py-4 group rounded-xl w-[250px] ${
              isNotificationClick ? "" : "hover:bg-gray-200"
            } text-${
              isNotificationClick ? "violet-600 font-semibold" : "#343A40"
            }`}
          >
            <Image
              alt="notification"
              src={`/sideleft/notification/${
                isNotificationClick ? "after" : "index"
              }.svg`}
              height={24}
              width={24}
            />
            <span>Notification</span>
          </button>
        </Link>
      </div>
      <div className="setting">
        <Link href={"/signup"}>
          <button
            onClick={handleSettingClick}
            className={`flex flex-row gap-2 items-${
              isSettingClick ? "center" : "start"
            } px-4 py-4 group rounded-xl w-[250px] ${
              isSettingClick ? "" : "hover:bg-gray-200"
            } text-${isSettingClick ? "violet-600 font-semibold" : "#343A40"}`}
          >
            <Image
              alt="setting"
              src={`/sideleft/setting/${
                isSettingClick ? "after" : "index"
              }.svg`}
              height={24}
              width={24}
            />
            <span>Setting</span>
          </button>
        </Link>
      </div>
    </>
  );
};



export default SideStyle;
