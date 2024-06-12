"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SideLeft } from "@/components/Molecules";
import axios from 'axios'

const AfteLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const nameUser = "Kimlang Tieng"

  return (
    <>
      <div className="relative">
        <button
          className="flex flex-row gap-2 w-auto px-4 h-[50px] items-center justify-center rounded-xl shadow-sm  hover:border-[#D9D9D9] hover:border"
          onClick={toggleDropdown}
        >
          Welcome, { nameUser.length > 6 ? nameUser.substring(0, 7) : nameUser }
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 15L12 9L6 15" stroke="#33363F" strokeWidth="2" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="#33363F" strokeWidth="2" />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-auto px-24 shadow-md rounded-md bg-white z-55 pl-2 right-0 ">
            <ul className="px-2 py-5 flex flex-col gap-4">
              <li>
                <Link href={"/profile"}>
                  <button className="hover:font-medium" >Profile</button>
                </Link>
              </li>
              <li>
                <Link href={"/setting/"}>
                  <button className="hover:font-medium">Setting</button>
                </Link>
              </li>
              <li>
                <Link href={"/signup/"}>
                  <button className="text-red-400 hover:font-medium items-start justify-start">Log Out</button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AfteLogin;
