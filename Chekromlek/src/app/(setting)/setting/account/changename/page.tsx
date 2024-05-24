'use client'
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
type SetSave = Dispatch<SetStateAction<boolean>>; // Assuming 'save' is of type boolean

const Page = () => {
  const [newName, setNewName] = useState("");
  const [password,setPassword]=useState("");
  const handleSave = () => {
    // Perform actions with currentName and newName
    console.log("New Name:", newName);
    console.log("Password",password)
  };

  return (
    <>
      <div className="flex flex-col gap-10 lg:gap-6 mt-24 lg:border lg:border-gray-200 lg:p-4 lg:shadow-lg">
        <div>
          <Link href={"http://localhost:3000/setting/account"}>
            <div className="flex flex-row gap-2 ml-2">
              <Image
                src={"/icons/arrow-back.svg"}
                alt="setting_icon"
                width={20}
                height={20}
              />
              <h1>Change Name</h1>
            </div>
          </Link>
          <hr className=" w-[370px] text-left ml-2 mt-1 lg:w-[460px] h-2px md:w-[430px] border-gray-300" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className="ml-14 text-sm lg:ml-5">Current Name:</label>
            <div className=" w-[280px] lg:w-[350px] h-[50px] md:w-[330px] ml-14 lg:ml-0 border rounded-lg shadow-lg px-4 flex items-center">
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className="ml-14 text-sm lg:ml-10">
              New Name:
            </label>
            <textarea
              name=""
              id=""
              // placeholder="Input your Name"
              className=" w-[280px] lg:w-[350px] h-[50px] p-3 text-sm md:w-[330px] ml-14 lg:ml-0 border rounded-lg shadow-lg"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className="ml-14 text-sm lg:ml-12">
              Password:
            </label>
            <textarea
              name=""
              id=""
              // placeholder="Input your password"
              className=" w-[280px] lg:w-[350px] h-[50px] md:w-[330px] text-sm p-3 ml-14 lg:ml-0 border rounded-lg shadow-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center lg:justify-end lg:items-end gap-2 mr-3  ">
          <Button className="w-[80px]" onClick={handleSave} background="bg-violet-500">
            Save
          </Button>
          <Button className="" background="bg-slate-300">
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
