"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:3000/v1/post/66695240dab21c486da7929c/getlikecount', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikeCount(response.data.likeCount);
        setIsLiked(response.data.userHasLiked); // Assuming the backend returns whether the user has liked the post
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeCount();
  }, []);

  const handleClick = async () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1;
    setLikeCount(newLikeCount);

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post('http://localhost:3000/v1/post/66695240dab21c486da7929c/likepost', {
        isLiked: newLikeStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      console.error(error);
      // Optionally revert the state if the request fails
      setIsLiked(!newLikeStatus);
      setLikeCount(likeCount);
    }
  };

  return (
    <button
      className={`flex flex-row gap-1 justify-center items-center ${
        isLiked ? 'text-[#E53E4F]' : 'text-[#343A40]'
      }`}
      onClick={handleClick}
    >
      <p className={`text-[16px] max-sm:text-xs font-normal`}>{likeCount}</p>
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
