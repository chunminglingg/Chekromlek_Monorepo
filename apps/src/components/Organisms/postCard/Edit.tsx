"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HideCard } from "./HideCard";

const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isVisible, setIsVisible] = useState(true);

  const hideCard = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className="flex flex-row gap-2 w-auto items-center justify-center  hover:border rounded-md"
          onClick={toggleDropdown}
        >
         
          <Image src={"/icons/edit.svg"} alt="edit" height={24} width={24} />
         
        </button>
        {isOpen && (
          <div className="absolute z-10 w-auto border rounded-md bg-white z-55 pl-1 right-0 ">
            <ul className="px-2 py-2 flex flex-col">
              <li>
                  <HideCard onHide={hideCard} />
              </li>
              <li>
                  <button className="hover:font-bold text-[12px]">Hide</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;
