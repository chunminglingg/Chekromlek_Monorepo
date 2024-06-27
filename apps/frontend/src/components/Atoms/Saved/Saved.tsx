"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

interface SavedProps {
  postId: string; // or number, depending on your ID type
}

const Saved: React.FC<SavedProps> = ({ postId }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Retrieve saved state from local storage when the component mounts
  useEffect(() => {
    const savedStatus = localStorage.getItem(`savedPost-${postId}`);
    if (savedStatus === "true") {
      setIsSaved(true);
    }
  }, [postId]);

  const handleClick = async () => {
    const newIsSaved = !isSaved;
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/users/save/${postId}`,
        { isSaved: newIsSaved },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responseData:", response.data);

      toast({
        description: newIsSaved
          ? " saved successfully"
          : " unsaved successfully ",
      });
      setIsSaved(newIsSaved);
      localStorage.setItem(`savedPost-${postId}`, newIsSaved.toString());
    } catch (error: any) {
      console.error(
        "Error saving the post:",
        error.response ? error.response.data : error.message
      );
      toast({
        description:
          "There was an error saving the post. Please try again later.",
      });
    }
  };

  return (
    <button
      className={`flex flex-row gap-2 justify-center items-center ${isSaved ? "text-[#3A7CA5]" : "text-[#343A40]"}`}
      onClick={handleClick}
    >
      <p className="text-[16px] max-sm:text-sm font-normal">
        {isSaved ? "Unsaved" : "Save"}
      </p>
      <Image
        src={
          isSaved ? "/card-svg/save/AfterSave.svg" : "/card-svg/save/saved.svg"
        }
        alt={isSaved ? "after-save" : "save"}
        width={18}
        height={18}
      />
    </button>
  );
};

export default Saved;