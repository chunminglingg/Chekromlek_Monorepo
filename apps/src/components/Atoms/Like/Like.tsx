"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';

const Like = ({like = 0}:{like: number}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      
      const newLikeStatus = !isLiked;
     
      setIsLiked(newLikeStatus);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
    setIsLiked(!isLiked)
  };
  
  return (
    <button
      className={`flex flex-row gap-1 justify-center items-center ${
        isLiked ? 'text-[#E53E4F]' : 'text-[#343A40]'
      }`}
      onClick={handleLike}
    >
      <p className={`text-[16px] max-sm:text-xs font-normal`}>{like}</p>
      <Image
        src={isLiked ? "/card-svg/like/Afterlike.svg" : "/card-svg/like/like.svg"}
        alt={isLiked ? 'after-like' : 'like'}
        width={16}
        height={16}
      />
    </button>
  );
};

export default Like;
