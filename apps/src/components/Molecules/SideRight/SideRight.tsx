import ButtonRightSide from "@/components/Atoms/Button/ButtonRightSide";
import React from "react";
import Link from "next/link";

const SideRight = () => {
  return (
    <>
      <div className="flex flex-col gap-4  max-sm:hidden max-md:hidden mr-3 ">
        <main>
          <h2 className="text-[#ACACAC] mb-[5%]">Suggest for you</h2>
          <div className="flex flex-col gap-2 ms-5">
            <Link href={"/categories/math"}>
              <ButtonRightSide>Mathematic</ButtonRightSide>
            </Link>
            <Link href={"/categories/physic"}>
              <ButtonRightSide>Physic</ButtonRightSide>
            </Link>
            <Link href={"/categories/khmer"}>
              <ButtonRightSide>Khmer Writing</ButtonRightSide>
            </Link>
            <Link href={"/categories/chemistry"}>
              <ButtonRightSide>Chemistry</ButtonRightSide>
            </Link>
            <Link href={"/categories/biology"}>
              <ButtonRightSide>Biology</ButtonRightSide>
            </Link>
            <Link href={"/categories/history"}>
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
