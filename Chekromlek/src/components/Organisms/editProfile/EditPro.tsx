"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectSex } from "./SelectSex"; // Ensure correct path
import UploadPro from './UploadPro'; // Ensure correct path

export function EditProfile() {
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');

  const handleBioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setBio(event.target.value);
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleSubmit = () => {
    console.log("Submitting form data");
    console.log("Bio:", bio);
    console.log("Gender:", gender);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none border rounded-2xl  hover:opacity-[70%] p-2 h-[40px] max-sm:w-[80px] items-center justify-center">
          <p className="text-base max-sm:text-sm ">EditProfile</p>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[525px] max-sm:w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <UploadPro/>
        <div className="flex-row items-center justify-center gap-5 outline-none">
          <div className="flex-row items-center gap-5 py-4 outline-none">
            <p className="text-left ">Bio</p>
            <input
              type="text"
              id="name"
              value={bio}
              onChange={handleBioChange}
              placeholder="Description"
              className="w-full h-[40px] border rounded-lg p-2 focus:outline-none"
            />
          </div>
          <div className="flex-row w-full focus:outline-none">
            <p className="text-left">Gender</p>
            <SelectSex onSelect={handleGenderSelect}/>
          </div>
          <p className="text-[10px] mt-2">
            {"This won't be part of your public profile."}
          </p>
        </div>
        <DialogFooter className='flex items-end justify-center'>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center border w-[100px] h-[40px] rounded-lg bg-violet-700 hover:opacity-50 text-white"
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
