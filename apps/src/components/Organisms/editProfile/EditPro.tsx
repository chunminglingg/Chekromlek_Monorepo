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
import { Typography } from "@/components/Atoms/Typography/Typography";

export function EditProfile() {
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
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
        <Button className=" relative" rounded="3xl" colorOutline="primary">
          <div>
            <Typography>EditProfile</Typography>
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
          {/* Select Job Title */}
          <div className="flex flex-col w-full focus:outline-none">
            <label className="text-left">Job Tittle</label>
            <Select onValueChange={handleJobSelect}>
              <SelectTrigger className="w-full focus:outline-none">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none">
                <SelectGroup className="focus:outline-none">
                  <SelectLabel>Select Job</SelectLabel>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Input Bio */}
          <div className="flex flex-col items-start py-4 outline-none w-full">
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
          {/* Select Gender */}
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
        {/* Summit */}
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
