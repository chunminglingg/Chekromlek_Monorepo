"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      className={`flex flex-row gap-1 justify-center items-center ${
        isLiked ? 'text-[#E53E4F]' : 'text-[#343A40]'
      }`}
      onClick={handleClick}
    >
      <p className={`text-[16px] max-sm:text-xs font-normal`}>{isLiked ? '13' : '12'}</p>
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