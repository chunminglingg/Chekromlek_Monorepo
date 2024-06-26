"use client";
import { SideLeft } from "../../Molecules";
import SearchInput from "../../Molecules/Search/SearchInput";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Burger = ({
  session,
  sigSession,
  isLogin,
}: {
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
  isLogin: boolean;
}) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click); // Toggle the click state
  };
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility of the search input
  const toggleSearchInput = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className="flex flex-none gap-1  justify-center items-start">
        <div className="flex flex-col gap-2 items-end">
          {!click && (
            <button onClick={handleClick}>
              <Image
                alt="burger"
                src={"/icons/burger.svg"}
                width={24}
                height={24}
              />
            </button>
          )}

          {click && (
            <>
              <button onClick={handleClick}>
                <Image
                  alt="cancel"
                  src={"/icons/cancel.svg"}
                  width={24}
                  height={24}
                />
              </button>

              <div
                className={`bg-white w-[270px] ${isLogin ? `h-[395px]` : `h-[340px]`} rounded-tl-2xl rounded-tr-0 rounded-br-0 rounded-bl-2xl shadow-md border`}
              >
                <div className="flex flex-col gap-2 items-center pt-4">
                  {isLogin ? (
                    <Link href={"/profile/"}>
                      <button className="px-20 py-2 bg-[#7B2CBF] text-white rounded-lg hover:opacity-[60%]">
                        Profile
                      </button>
                    </Link>
                  ) : (
                    <Link href={"/login/"}>
                      <button className="px-20 py-2 bg-[#7B2CBF] text-white rounded-lg hover:opacity-[60%]">
                        Login
                      </button>
                    </Link>
                  )}
                  <div className="w-[100%] h-[0.5px] bg-gray-200"></div>
                  {/* Render the dropdown content here */}
                  <SideLeft session={session} sigSession={sigSession} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Burger;
