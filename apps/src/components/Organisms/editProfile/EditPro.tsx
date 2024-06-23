"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
import axios from "axios";

interface userDataTypes {
  _id: string;
  username: string;
  email: string;
  work: string;
  answers: number;
  posts: number;
  bio: string;
  gender: string;
  profile: string;
}

export function EditProfile() {
  const [bio, setBio] = useState<string>("");
  const [work, setWork] = useState("");
  const [gender, setGender] = useState("");
  const [profile, setProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    bio: false,
    job: false,
    gender: false,
  });

  const [userData, setUserData] = useState<userDataTypes | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/users/profile",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response) {
        setUserData(response.data.user);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBio(event.target.value);
  };

  const handleJobSelect = (selectedJob: React.SetStateAction<string>) => {
    setWork(selectedJob);
  };

  const handleGenderSelect = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
  };

  const handleImageUpload = (uploadedFile: File | null) => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(e.target?.result as string);
      };
      reader.readAsDataURL(uploadedFile); // or use readAsText(uploadedFile) if you want to read it as plain text
    } else {
      setProfile("");
    }
  };

  const handleSubmit = () => {
    const formErrors = {
      bio: !bio,
      job: !work,
      gender: !gender,
    };

    setErrors(formErrors);

    if (!bio || !work || !gender) {
      return;
    }

    setLoading(true);
    const formData = {
      bio,
      work,
      gender,
      profile,
    };
    console.log("formdata: " + formData);

    const handleUpdate = async () => {
      try {
        const response = await axios.patch(
          "http://localhost:3000/v1/users/update",
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response) {
          setSuccess(true);
        }
      } catch (error: any) {
        throw error;
      }
    };

    // Simulate a loading process with a timeout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset all fields after submission
      setBio("");
      setWork("");
      setGender("");
      setProfile(null);
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
    return handleUpdate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative" rounded="3xl" colorOutline="primary">
          <div>
            <Typography>Edit Profile</Typography>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[525px] max-sm:w-[350px] rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <UploadPro onUpload={handleImageUpload} username={userData.username} />{" "}
        {/* Pass the upload handler */}
        <div className="flex flex-col items-start justify-center gap-1 outline-none">
          {/* Select Job Title */}
          <div className="flex flex-col w-full focus:outline-none">
            <label className="text-left pb-1">Job Title</label>
            <Select value={work} onValueChange={handleJobSelect}>
              <SelectTrigger className="w-full focus:outline-none">
                <SelectValue placeholder="Select a Job" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none">
                <SelectGroup className="focus:outline-none">
                  <SelectLabel>Select Job</SelectLabel>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* {errors.job && <p className="text-red-500 text-sm">Job is required.</p>} */}
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
            {/* {errors.bio && <p className="text-red-500 text-sm">Bio is required.</p>} */}
          </div>
          {/* Select Gender */}
          <div className="flex flex-col w-full focus:outline-none">
            <label className="text-left">Gender</label>
            <Select value={gender} onValueChange={handleGenderSelect}>
              <SelectTrigger className="w-full focus:outline-none">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none">
                <SelectGroup className="focus:outline-none">
                  <SelectLabel>Select Gender</SelectLabel>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* {errors.gender && <p className="text-red-500 text-sm">Gender is required.</p>} */}
          </div>
          <p className="text-[10px] text-left flex items-start justify-start ">
            {`This won't be part of your public profile.`}
          </p>
        </div>
        {/* Submit */}
        <DialogFooter className="flex items-end justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center border w-[100px] h-[40px] rounded-lg bg-violet-700 hover:opacity-50 text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Edit"}
          </button>
        </DialogFooter>
        {success && (
          <div className="text-center mt-4 text-green-500">
            Profile updated successfully!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
