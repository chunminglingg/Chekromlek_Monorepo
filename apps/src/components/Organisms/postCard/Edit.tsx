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
          className="flex flex-row gap-2 w-auto items-center justify-center  hover:border hover:bg-slate-200 rounded-md"
          onClick={toggleDropdown}
        >
         
          <Image src={"/icons/edit.svg"} alt="edit" height={20} width={20} />
         
        </button>
        {isOpen && (
          <div className="absolute z-10 w-auto border rounded-md bg-white z-55 right-0 ">
            <ul className="px-1 py-1 flex flex-col">
              <li>
                  <button className="hover:font-bold text-[12px]">Edit</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;
