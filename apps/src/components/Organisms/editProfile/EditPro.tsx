"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadPro } from "./UploadPro"; // Ensure correct path
import { Button } from "@/components/Atoms/Button/Button";

export function EditProfile() {
  const [bio, setBio] = useState("");
  const [job , setJob] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBio(event.target.value);
  };
  const handleJobSelect = (selectedJob: React.SetStateAction<string>) => {
    setJob(selectedJob);
  };

  const handleGenderSelect = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
  };

  const handleImageUpload = (uploadedFile: React.SetStateAction<null>) => {
    setImage(uploadedFile);
  };

  const handleSubmit = () => {
    const formData = {
      bio,
      job,
      gender,
      image,
    };

    console.log("Submitting form data", formData);
    // Perform the form submission logic here (e.g., API call)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#7B2CBF] to-[#D600E8] rounded-xl" />
          <div className="px-6 py-[9px] bg-white rounded-xl flex flex-row relative group transition duration-200 text-white hover:bg-gray-100">
            <p className="text-black text-[10px]">EditProfile</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[525px] max-sm:w-[350px] rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <UploadPro onUpload={handleImageUpload} />{" "}
        {/* Pass the upload handler */}

        <div className="flex flex-col iitems-start justify-center gap-1 outline-none">
          <div className="flex flex-col items-start gap-5 py-4 outline-none w-full">
            <label className="text-left">Bio</label>
            <input
              type="text"
              id="bio"
              value={bio}
              onChange={handleBioChange}
              placeholder="Description"
              className="w-full h-[40px] border rounded-lg p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full focus:outline-none">
            <label className="text-left">Job Tittle</label>
            <Select onValueChange={handleJobSelect}>
              <SelectTrigger className="w-full focus:outline-none">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none">
                <SelectGroup className="focus:outline-none">
                  <SelectLabel>Select Job</SelectLabel>
                  <SelectItem value="web dev">Web Dev</SelectItem>
                  <SelectItem value="app dev">App Dev</SelectItem> 
                  <SelectItem value="backend">Backend Dev</SelectItem> 
                  <SelectItem value="fontend">Frontend Dev</SelectItem> 
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col w-full focus:outline-none">
            <label className="text-left">Gender</label>
            <Select onValueChange={handleGenderSelect}>
              <SelectTrigger className="w-full focus:outline-none">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none">
                <SelectGroup className="focus:outline-none">
                  <SelectLabel>Select Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="text-[10px] text-left flex items-start justify-start ">
            {`This won't be part of your public profile.`}
          </p>
        </div>
        <DialogFooter className="flex items-end justify-center">
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
