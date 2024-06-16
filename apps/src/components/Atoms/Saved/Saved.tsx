'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';

interface SavedProps {
  postId: string; // Accept postId as a prop
}

const Saved: React.FC<SavedProps> = ({ postId }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/users/save/${postId}`, // Use dynamic postId in the URL
        { isSaved }, // Pass isSaved as an object
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data.message);
      toast({
        description: 'The post has been successfully saved',
      });

      // Toggle the saved state only if the request is successful
      setIsSaved(!isSaved);
    } catch (error: any) {
      console.error('Error saving the post:', error);
      toast({
        description: 'There was an error saving the post. Please try again later.',
      });
    }
  };

  return (
    <button
      className={`flex flex-row gap-2 justify-center items-center ${isSaved ? 'text-[#3A7CA5]' : 'text-[#343A40]'}`}
      onClick={handleClick}
    >
      <p className="text-[16px] max-sm:text-sm font-normal">
        {isSaved ? 'Unsave' : 'Save'}
      </p>
      <Image
        src={isSaved ? '/card-svg/save/AfterSave.svg' : '/card-svg/save/saved.svg'}
        alt={isSaved ? 'after-save' : 'save'}
        width={18}
        height={18}
      />
    </button>
  );
};

export default Saved;
