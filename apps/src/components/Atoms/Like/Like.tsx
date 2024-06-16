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
  console.log("isFavorite", isFavorite);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCounts] = useState(likeCounts);

  let clickTimeout: NodeJS.Timeout;

  const handleLikes = async () => {
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
        setLikeCounts((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
      } else {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
          newLikeStatus ? prevCount + 1 : prevCount - 1
        );
      } else {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error toggling unlike:", error);
    }
  };

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      // handleDoubleClick();
    } else {
      clickTimeout = setTimeout(() => {
        handleLike();
        clearTimeout(clickTimeout);
      }, 300);
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
      } else if (
        response.data.message ===
        "Failed to Like post: User has already liked this post"
      ) {
        setIsLiked(isLiked);
        setLikeCounts(likeCounts - 1);
      }
    } catch (err: any) {
      console.log("error of catch :", err);
    }
  };

  // const handleDoubleClick = async () => {
  //   try {
  //     const response = await axios.post(`http://localhost:3000/v1/post/${postId}/likepost`, {}, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(response);

  //     if (response.status === 200) {
  //       const newLikeStatus = !isLiked;
  //       setIsLiked(newLikeStatus);
  //       setLikeCounts(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
  //     } else if (response.data.errors && response.data.errors[0].message.includes("User has already liked this post")) {
  //       handleUnlike();
  //     }
  //   } catch (error: any) {
  //     if (error.response.data.errors && error.response.data.errors[0].message.includes("User has not liked this post")) {
  //       handleLike();
  //     } else {
  //       console.error('Error handling double click:', error);
  //     }
  //   }
  // };
  // console.log("like: " , likeCounts);

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
