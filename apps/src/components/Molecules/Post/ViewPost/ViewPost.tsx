"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Typography } from "@/components/Atoms";
import Link from "next/link";
import axios from "axios";

export interface ViewPostProps {
  id: string | string[]; // Add id here
  profile: string;
  username: string;
  createdAt: number;
  title?: string;
  description?: string;
  postImage?: string | undefined;
}

const ViewPost: React.FC<ViewPostProps> = ({
  id, // Receive id here
  profile,
  username,
  createdAt,
  title,
  description,
  postImage,
}) => {
  const [isCaptionTruncated, setIsCaptionTruncated] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [answers, setAnswers] = useState([]); // State to store answers

  // Log the post ID to verify it's being received correctly
  console.log("Post ID:", id);

  // Fetch answers when component mounts
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/post/${id}/answer`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAnswers(response.data.answers); // Assuming the response contains an "answers" array
      } catch (error) {
        console.log("Failed to fetch answers", error);
      }
    };

    fetchAnswers();
  }, [id]);

  const toggleCaptionTruncation = () => {
    setIsCaptionTruncated(!isCaptionTruncated);
  };

  const truncateCaption = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const maxCaptionLength = 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/post/${id}/answer`, // Use the id here
        { answer: inputValue }, // Wrapping inputValue in an object
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("post not success", error);
    }
    console.log("answer:", inputValue);
    setIsButtonClicked(true);
    setInputValue("");
    setTimeout(() => setIsButtonClicked(false), 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div className="w-auto max-sm:w-[315px] h-auto min-md:mt-[10%] p-2 max-sm:m-4">
      <div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center">
            <Link href={`/profile/${username}`}>
              <Image
                src={profile}
                width={42}
                height={42}
                className="w-10 h-10 rounded-full"
                alt="profile"
              />
            </Link>
            <div className="ml-2">
              <Link href={`/profile/${username}`}>
                <h3 className="font-medium text-[16px] text-[#343A40]">
                  {username}
                </h3>
              </Link>
              <div className="flex flex-row gap-1">
                <Image
                  src={"/icons/time.svg"}
                  alt="time"
                  width={13}
                  height={13}
                />
                <p className="font-normal text-[12px] text-[#6C757D]">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-content flex flex-col gap-4 pt-2 pb-2">
          <div className="mt-1 w-auto title font-semibold text-[#343A40] text-2xl hover:underline max-sm:text-lg max-sm:font-medium pt-2 hover:cursor-pointer break-words">
            <Link href={`/post/${id}`}>
              <Typography fontSize="title" align="left" className="">
                {title}
              </Typography>
            </Link>
          </div>
          <p className="text-[14px] text-[#6C757D] font-medium break-words">
            {isCaptionTruncated
              ? truncateCaption(description || "", maxCaptionLength)
              : description}
            {description && description.length > maxCaptionLength && (
              <button
                className="text-[14px] text-[#4b81ed] font-medium underline cursor-pointer ml-1"
                onClick={toggleCaptionTruncation}
              >
                {isCaptionTruncated ? " See more" : "See less"}
              </button>
            )}
          </p>
          {postImage && (
            <div className="w-[100%] h-full md:w-[100%] flex justify-center items-center">
              <Image
                alt="content post"
                src={postImage}
                width={320}
                height={420}
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <div className="h-[47px] flex items-center justify-center border rounded-md">
          <input
            type="text"
            placeholder="Answer question..."
            className="w-full px-2 py-2 text-[#6C757D] rounded-md focus:outline-none text-sm"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleInputSubmit}>
            <Image
              alt="post"
              src={isButtonClicked ? "/icons/done.svg" : "/icons/sent.svg"}
              width={38}
              height={38}
              className="-translate-x-3"
            />
          </button>
        </div>
        <div className="mt-4">
          {/* <h3 className="font-medium text-[16px] text-[#343A40]">Answers:</h3> */}
          <ul className="list-disc list-inside">
            {answers.map((answer, index) => (
              <li
                key={index}
                className="text-[14px] text-[#6C757D] font-medium"
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
