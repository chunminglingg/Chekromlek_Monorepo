"use client";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components";
type SetSave = Dispatch<SetStateAction<boolean>>; // Assuming 'save' is of type boolean

const Page = () => {
  const [newName, setNewName] = useState("");
  const [currentName, setCurrentName] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSave = () => {
    const correctPassword = "correctPassword";

    if (newName === currentName) {
      setError("New name cannot be the same as the current name.");
      setSuccess("");
      return;
    }

    // if (password !== correctPassword) {
    //   setError("Incorrect password.");
    //   setSuccess("");
    //   return;
    // }
    
    console.log("Current Name", currentName)
    console.log("New Name:", newName);
    console.log("Password", password);
    setNewName("");
    setPassword("");
    setCurrentName("");
    setError("");
    setSuccess("Name changed successfully!");
  };

  return (
    <>
      <div className="flex flex-col lg:ml-[164px] gap-10 lg:gap-6 mt-28 lg:border lg:border-gray-200 lg:p-4 lg:shadow-lg">
      <div className="flex flex-col gap-10 lg:gap-6 mt-28 lg:border rounded-md lg:border-gray-200 lg:p-4 lg:shadow-lg">
        <div>
          <Link href={"/setting/account"}>
            <div className="flex flex-row gap-2 ml-2">
              <Image
                src={"/icons/arrow-back.svg"}
                alt="setting_icon"
                width={20}
                height={20}
              />
              <Typography fontSize="caption">Change Name</Typography>
            </div>
          </Link>
          <hr className=" w-[370px] text-left ml-2 mt-1 lg:w-[460px] h-2px md:w-[430px] border-gray-300" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <Typography>Current Name:</Typography>
            <div className=" w-[280px] lg:w-[350px] h-[50px] md:w-[330px] ml-14 lg:ml-0 border rounded-lg shadow-lg px-4 flex items-center"></div>
            <label htmlFor="" className="ml-14 text-sm lg:ml-5">
              Current Name:
            </label>
            <input
              name=""
              id=""
              placeholder="your current name"
              className=" w-[280px] lg:w-[350px] h-[50px] p-3 text-sm md:w-[330px] ml-14 lg:ml-0 border rounded-lg shadow-lg focus:outline-none"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className="ml-14 text-sm lg:ml-10">
              New Name:
            </label>
            <input
              name=""
              id=""
              placeholder="your new name"
              className=" w-[280px] lg:w-[350px] h-[50px] p-3 text-sm md:w-[330px] ml-14 lg:ml-0 border rounded-lg shadow-lg focus:outline-none"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          {error && (
          <div>
           <Typography fontSize="normal" color="wearing" align="right">{error}</Typography> 
          </div>
        )}
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className="ml-14 text-sm lg:ml-12">
              Password:
            </label>
            <input
              name=""
              id=""
              placeholder="input password for confirm"
              className=" w-[280px] lg:w-[350px] h-[50px] md:w-[330px] text-sm p-3 ml-14 lg:ml-0 border rounded-lg shadow-lg focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
     
        <div className="flex flex-row max-sm:justify-center max-sm:items-center sm:justify-end lg:justify-end lg:items-end gap-2 mr-3  ">
          <Button size="sm" onClick={handleSave} colorScheme="primary"  rounded="lg" className="hover:opacity-80">
            <Typography fontSize="normal" color="submit">
            <Typography fontSize="normal" color="submit">
              Save
            </Typography>
          </Button>
          <Button size="sm" colorScheme="secondary" className="hover:opacity-80" rounded="md">
            <Typography fontSize="normal" color="submit">
            <Typography fontSize="normal" color="submit">
              Cancel
            </Typography>
          </Button>
        </div>
        {success && (
            <div className="flex flex-col w-auto lg:flex-row gap-2 lg:justify-center lg:items-center max-sm:justify-center max-sm:items-center sm:items-center">
              <div className="text-sm  text-green-500  p-4 bg-green-100 border border-green-400 rounded">
                {success}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Page;
