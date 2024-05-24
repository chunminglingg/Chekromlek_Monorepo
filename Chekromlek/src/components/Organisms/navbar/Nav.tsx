'use client'
import { Burger } from "@/components/Atoms"
import Logo from "@/components/Atoms/Logo/Logo";
import SearchInput from "@/components/Molecules/Search/SearchInput";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function navbar() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-20 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-10 flex justify-between">
        <div className="flex flex-row gap-4 items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          </div>
          <div className="mt-2   max-sm:me-[20%] max-md:me-[15%] max-sm:w-[160px]">   
          {/* */}
          <SearchInput setSearch={setSearchQuery}/>
          </div>
        
        <div className="hidden md:flex md:flex-row gap-4 items-center pr-8">
          <Link href={"#"}>
            <Image
              src={"/icons/lan.svg"}
              alt="languese"
              width={34}
              height={34}
            />
          </Link>
          <div className="flex flex-row gap-2 items-center">
            <button className="text-[#7B2CBF] text-lg border border-[#7B2CBF] hover:text-white hover:bg-[#7B2CBF] flex flex-row gap-2 px-8 py-2 rounded-lg">
              <Link href={"/login"}>Login</Link>
            </button>
            <button className="text-white text-lg border border-[#7B2CBF] bg-[#7B2CBF] flex flex-row gap-2 px-6 py-2 rounded-lg">
              <Link href={"/signup"}>Register</Link>    
            </button>
          </div>
        </div>

        <div className="block md:hidden mt-4 absolute right-5">
          <Burger />
        </div>
      </div>
    </nav>
  );
};

export default navbar;
