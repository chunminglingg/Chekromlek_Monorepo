import Link from "next/link";
import React from "react";



export const BeforeLogin = () => {
  
  return (
    <div className="hidden md:flex md:flex-row gap-4 items-center pr-8">
      <div className="flex flex-row gap-2 items-center">
        <button className="text-[#7B2CBF] text-lg border border-[#7B2CBF] hover:text-white hover:bg-[#7B2CBF] flex flex-row gap-2 px-8 py-2 rounded-lg">
          <Link href={"/login"}>Login</Link>
        </button>
        <button className="text-white text-lg border border-[#7B2CBF] bg-[#7B2CBF] flex flex-row gap-2 px-6 py-2 rounded-lg">
          <Link href={"/signup"}>Register</Link>
        </button>
      </div>
    </div>
  );
};

