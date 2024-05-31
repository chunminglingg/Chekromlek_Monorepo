"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectScrollable } from "../Selection/Selection";
import { HeaderPost } from "../AfterPostHeader";
import UploadButton from "@/components/Molecules/UploadImage/UploadButton"

const CreatePostDialog: React.FC = () => {
  // Define state variables to store input data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Function to handle title input change
  const handleTitleChange = (e:any) => {
    setTitle(e.target.value);
  };

  // Function to handle description input change
  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // You can access title and description here to post the data
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Uploaded Image URL:", uploadedImageUrl);

    // You can perform further actions like posting the data to a server

    setTitle("");
    setDescription("");
    setUploadedImageUrl("");
  };
  const handleAttachmentUpload = (imageUrl:string) => {
    // Set the uploaded image URL
    setUploadedImageUrl(imageUrl);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <HeaderPost />
        </DialogTrigger>
        <DialogContent className="w-[645px]  max-sm:w-[90%] max-sm:rounded-md">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Create a Post </DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                Simplify Your Sharing Experience!
                <SelectScrollable />
              </div>
              <div className="flex flex-col gap-4 pt-6 focus:outline-none">
                {/* Title input */}
                <input
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                  className="focus:outline-none border rounded-md h-[40px] p-1"
                />
                {/* Description input */}
                <textarea
                  placeholder="Type your descriptions of your question here."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="focus:outline-none border rounded-md h-[80px] p-1"  
                />
                <div className="w-full h-[250px] border rounded-md justify-center items-center grid  gap-1.5">
                  {/* File input */}
                  {/* <Input type="file" /> */}
                  <UploadButton onImageUpload={handleAttachmentUpload} />
                </div>
              </div>
              <div className="flex justify-end">
                {/* Post button */}
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 bg-[#7B2CBF] hover:opacity-[70%] text-white rounded-md"
                >
                  Post
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostDialog;