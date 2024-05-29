"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';

const Saved = () => {
  const [isSaved, setIsSaved] = useState(false); // Use a descriptive variable name

  const handleClick = () => {
    setIsSaved(!isSaved); 
    
  };

  return (
    <button
      className={`flex flex-row gap-2 justify-center items-center ${
        isSaved ? 'text-[#3A7CA5]' : 'text-[#343A40]'
      }`}
      onClick={handleClick}
    
      
    >
      <p className={`text-[16px] max-sm:text-sm font-normal`}>
        {isSaved ? 'Unsaved' : 'Save'}
      </p>
      <Image
        src={isSaved ? "/card-svg/save/AfterSave.svg" : "/card-svg/save/saved.svg"}
        alt={isSaved ? 'after-save' : 'save'}
        width={18}
        height={18}
      />
    </button>
  );
};

export default Saved;
