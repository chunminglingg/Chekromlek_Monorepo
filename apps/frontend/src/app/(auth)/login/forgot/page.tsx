import Image from "next/image";
import React from "react";
import "../../../globals.css";
import Link from "next/link";
import { Button } from "../../../../components/Atoms/Button/Button";
import { Typography } from "../../../../components";

const page = () => {
  return (
    <>
      <div className="flex flex-row max-lg:flex-row h-screen w-screen justify-between">
        {/* Left panel */}
        <div className="hidden md:flex w-1/2 h-screen  max-md:bg-white lg:flex relative justify-center items-center shadow-md">
          <div className="hidden lg:block">
            <Image
              src={"/login/forgetpwd.svg"}
              alt="panel3"
              width={530}
              height={300}
            />
          </div>
          <div className="lg:hidden">
            <Image
              src={"/login/pandel3.svg"}
              alt="panel3"
              width={300}
              height={300}
            />
          </div>
        </div>
        {/* Right card */}
        <div className="w-1/2 flex items-center justify-center max-sm:w-[95%] max-sm:ml-2 max-sm:mb-12">
          <div className="w-[450px] w-max-auto h-screen flex flex-col items-center justify-center ">
            <div className="pb-10">
              <Image
                src={"/login/logo.svg"}
                alt="logo"
                width={150}
                height={80}
              />
            </div>
            <div className=" h-[300px] h-max-auto relative rounded-3xl shadow-md ">
              <div className="flex flex-col gap-5 h-[93px] justify-center">
                <p className="font-medium text-[20px] ml-5 text-[#343A40]">
                  Find your account
                </p>
                <div className="h-[1px] bg-[#dadcdd]"></div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="ml-4 text-[16px] text-gray-400">
                  Please enter your email address or mobile number to search for
                  your account.
                </p>
                <input
                  type="email"
                  className="border w-[92%] h-[50px] p-4 rounded-xl focus:outline-none"
                  placeholder="yourname@example.com"
                />
              </div>
              <div className="flex items-start gap-3 absolute bottom-6 right-5">
                {/* <Link href={"/login"}>
                  <button className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-500">
                    Cancel
                  </button>
                </Link> */}
                <Link href={"/login/newpass"}>
                  <Button
                    className="px-6 py-3 bg-[#7B2CBF] text-white rounded-xl hover:opacity-[90%]"
                    colorScheme="primary"
                  >
                    <Typography color="submit">Search</Typography>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
