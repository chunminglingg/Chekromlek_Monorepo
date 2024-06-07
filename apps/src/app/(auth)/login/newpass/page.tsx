import Image from "next/image";
import React from "react";
import "../../../globals.css";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-screen justify-between">
        {/* Left panel */}
        <div className="hidden md:flex w-[60%] h-screen bg-[#7B2CBF] lg:flex relative justify-center items-center shadow-md">
          <div>
            <Image
              src={"/login/panel4.svg"}
              alt="panel3"
              width={530}
              height={300}
            />
          </div>
        </div>

        {/* Right card */}
        <div className="w-full md:w-[40%] h-screen flex flex-col items-center justify-center relative">
          <div className="absolute top-2 right-4">
            <Image src={"/login/logo.svg"} alt="logo" width={120} height={60} />
          </div>
          <div className="w-[500px]  md:w-[80%] max-md:w-[120px] max-sm:w-[95%]  relative rounded-3xl shadow-md">
            <div className="flex flex-col gap-5 h-[93px] justify-center items-center">
              <p className="font-medium text-[20px] ml-5 text-[#343A40] ">
                Change your password
              </p>
              <div className="h-[1px] bg-[#dadcdd] w-[100%]"></div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center align-middle">
              <p className="ml-4 text-[16px] text-gray-400">
                Enter a new password below to your change password.
              </p>
              <div className="w-[100%] ml-[10%] flex flex-col gap-1">
                <label
                  htmlFor="new password"
                  className="flex justify-start font-medium text-gray-500 opacity-[80%] ml-2"
                >
                  New password
                </label>
                <input
                  type="password"
                  className="border w-[92%] h-[50px] p-4 rounded-xl focus:outline-none"
                  placeholder="Enter your new password"
                />
                <label
                  htmlFor="new password"
                  className="flex justify-start font-medium text-gray-500 opacity-[80%] ml-2"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  className="border w-[92%] h-[50px] p-4 rounded-xl focus:outline-none"
                  placeholder="Comfirm your new password"
                />
              </div>
            </div>
            <div className="flex justify-center items-center pt-8">
              <Link href={"/"}>
                <button className="px-12 py-3  bg-[#7B2CBF] text-white rounded-xl hover:opacity-[90%] mb-4 ">
                  Change password
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
