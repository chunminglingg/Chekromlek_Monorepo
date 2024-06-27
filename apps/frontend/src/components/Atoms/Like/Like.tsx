"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

interface LikeProp {
  postId?: string;
  likeCounts: number;
  isFavorite: boolean;
}

const Like: React.FC<LikeProp> = ({ postId, likeCounts, isFavorite }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCounts] = useState(likeCounts);

  const handleUnlike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/post/${postId}/unlikepost`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);
        setLikeCounts((prevCount) =>
          newLikeStatus ? prevCount - 1 : prevCount
        );
      } else {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error toggling unlike:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/post/${postId}/likepost`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setIsLiked(!isLiked);
        setLikeCounts(likeCount + 1);
      }
      if (response) {}
    } catch (err: any) {
      console.log("error of catch:", err);
      if (
        err.response &&
        err.response.data.errors &&
        err.response.data.errors[0].message === "Failed to Like post: User has already liked this post"
      ) {
        setLikeCounts(likeCount - 1);
        handleUnlike();
      }
    }
  };

  return (
    <button
      className={`flex flex-row gap-1 justify-center items-center ${
        isFavorite ? "text-[#E53E4F]" : "text-[#343A40]"
      }`}
      onClick={handleLike}
    >
      <p className={`text-[16px] max-sm:text-xs font-normal`}>{likeCount}</p>
      <Image
        src={
          isLiked
            ? "/card-svg/like/Afterlike.svg"
            : "/card-svg/like/like.svg"
        }
        alt={isLiked ? "after-like" : "like"}
        width={16}
        height={16}
      />
    </button>
  );
};

export default Like;
