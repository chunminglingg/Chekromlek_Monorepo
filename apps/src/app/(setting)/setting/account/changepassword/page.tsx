"use client";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Yup from "yup";
import { validationSchema } from "@/schema/Auth@Validation/SavePw";
import { Typography } from "@/components/Atoms/Typography/Typography";
type SetSave = Dispatch<SetStateAction<boolean>>; // Assuming 'save' is of type boolean
interface Errors {
  currentPw?: string;
  newPw?: string;
  confirmPw?: string;
}


const Page = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  
  const handleSave = async () => {
    try {
      await validationSchema.validate(
        { currentPw, newPw, confirmPw },
        { abortEarly: false }
      );
      // No validation errors, proceed with getting the data
      console.log("Current Password:", currentPw);
      console.log("New Password:", newPw);
      console.log("Confirm Password:", confirmPw);

      // Clear validation errors
      setErrors({});

       // Show success alert
       setAlertVisible(true);
      
       // Hide alert after 3 seconds
       setTimeout(() => setAlertVisible(false), 5000);
    } catch (error) {
      if (error instanceof Yup.ValidationError && error.inner) {
        // Validation errors found, update the state with the errors
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) { // Ensure e.path is not undefined
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Validation error:", error);
      }
    }
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  };
  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-3 mt-24 lg:border rounded-md lg:border-gray-200 lg:p-4 lg:shadow-lg">
        <div>
          <Link href={"/setting/account"}>
            <div className="flex flex-row gap-2 ml-2">
              <Image
                src={"/icons/arrow-back.svg"}
                alt="setting_icon"
                width={20}
                height={20}
              />
              <h1>Change Password</h1>
            </div>
          </Link>
          <hr className="w-[370px] text-left ml-2 mt-1 lg:w-[460px] h-2px border-gray-300" />
        </div>
        <div className="flex flex-col gap-3 lg:gap-2">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 lg:justify-center lg:items-center">
            <label htmlFor="" className=" ml-14 text-sm lg:ml-6">
              Current Password:
            </label>
            <div className="flex flex-col">
              <input
                type="text"
                name=""
                id=""
                placeholder="current password" 
                className="w-[280px] ml-14 lg:ml-2 lg:w-[350px] h-[50px] border rounded-lg shadow-sm p-2 focus:outline-none"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
              />
              {errors.currentPw && (
                <p className="text-red-500 text-sm text-center lg:text-start lg:ml-3 lg:mt-2">
                  {errors.currentPw}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center ">
            <label
              htmlFor=""
              className="ml-14 text-sm lg:ml-11 text-[12px] lg:text-sm"
            >
              New Password:
            </label>
            <div className="flex flex-col">
              <input
                type="text"
                name=""
                id=""
                placeholder="new password"
                className="w-[280px] ml-14 lg:ml-2 lg:w-[350px] h-[50px] border rounded-lg shadow-sm p-2 focus:outline-none"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
              {errors.newPw && (
                <p className="text-red-500 text-sm text-center lg:text-start lg:mt-2 lg:ml-3">
                  {errors.newPw}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-center lg:items-center">
            <label
              htmlFor=""
              className="ml-14 text-[12px] text-sm lg:ml-[22px]"
            >
              confirm Password:
            </label>
            <div className="flex flex-col">
              <input
                type="text"
                name=""
                id=""
                placeholder="confirm password"
                className="w-[280px] ml-14 lg:ml-2 lg:w-[350px] h-[50px] border rounded-lg shadow-sm p-2 focus:outline-none"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
              {errors.confirmPw && (
                <p className="text-red-500 text-sm text-center lg:text-start lg:mt-2 lg:ml-3">
                  {errors.confirmPw}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center lg:justify-end lg:items-end gap-2  ">
          <Button size="sm" onClick={handleSave} colorScheme="primary" className="hover:opacity-80">
            <Typography fontSize="normal" color="submit">
              Save
            </Typography>
          </Button>
          <Button size="sm" colorScheme="secondary" className="hover:opacity-80">
            <Typography fontSize="normal" color="submit">
              Cancel
            </Typography>
          </Button>
        </div>
        {alertVisible && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Password changed successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
