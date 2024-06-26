"use client";

import ButtonRightSide from "../../Atoms/Button/ButtonRightSide";
import React from "react";
import Link from "next/link";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface SideRightProps {
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
}

const SideRight: React.FC<SideRightProps> = ({ session, sigSession }) => {
  const isLoggedIn = session && sigSession;

  return (
    <>
      <div className="flex flex-col gap-4 max-sm:hidden max-lg:hidden mr-3">
        <main>
          <h2 className="text-[#ACACAC] mb-[5%]">Suggest for you</h2>
          <div className="flex flex-col gap-2 ms-5">
            <Link href={isLoggedIn ? "/categories/math" : "/signup"}>
              <ButtonRightSide>Mathematic</ButtonRightSide>
            </Link>
            <Link href={isLoggedIn ? "/categories/physic" : "/signup"}>
              <ButtonRightSide>Physic</ButtonRightSide>
            </Link>
            <Link href={isLoggedIn ? "/categories/khmer" : "/signup"}>
              <ButtonRightSide>Khmer Writing</ButtonRightSide>
            </Link>
            <Link href={isLoggedIn ? "/categories/chemistry" : "/signup"}>
              <ButtonRightSide>Chemistry</ButtonRightSide>
            </Link>
            <Link href={isLoggedIn ? "/categories/biology" : "/signup"}>
              <ButtonRightSide>Biology</ButtonRightSide>
            </Link>
            <Link href={isLoggedIn ? "/categories/history" : "/signup"}>
              <ButtonRightSide>History</ButtonRightSide>
            </Link>
          </div>
          <footer>
            <p className="mt-5 text-[#a8b3bc] text-xs">
              Chekromlek, Inc. © 2024. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default SideRight;
