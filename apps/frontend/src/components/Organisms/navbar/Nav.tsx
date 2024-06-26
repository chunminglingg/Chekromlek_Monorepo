"use client";

import { useEffect, useState } from "react";
import { Burger } from "../../Atoms";
import Logo from "../../Atoms/Logo/Logo";
import SearchInput from "../../Molecules/Search/SearchInput";
import Link from "next/link";
import AfterLogin from "../../Atoms/Login/AfterLogin";
import { BeforeLogin } from "../../Atoms/Login/BeforLogin";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Navbar = ({
  isLogin,
  username,
  session,
  sigSession,
}: {
  isLogin: boolean;
  username: string;
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-20">
      <div className="px-3 py-3 lg:px-5 lg:pl-10 flex justify-between">
        {/* Logo */}
        <div className="flex flex-row gap-4 items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Input Search */}
        <div className="mt-2 max-sm:me-[20%] max-md:me-[15%] max-sm:w-[160px]">
          <SearchInput setSearch={setSearchQuery} />
        </div>

        {/* Authentication */}
        <div className="hidden md:flex md:flex-row gap-4 items-center pr-8">
          {isLogin ? <AfterLogin username={username} /> : <BeforeLogin />}
        </div>

        {/* Authentication Responsive */}
        <div className="block md:hidden mt-4 absolute right-5">
          <Burger isLogin={isLogin} session={session} sigSession={sigSession} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
