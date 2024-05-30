'use client'
import Image from "next/image";
import React, { useState } from "react";

export type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onIconClick?: () => void;
  onInputClick?: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ setSearch, onIconClick, onInputClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-row items-center border border-gray-300 rounded-md p-2 ms-[8%] lg:ms-[16%] lg:w-[390px] md:me-[10%] md:w-[290px] max-sm:ms-[2%] mix-md:w-[420px] sm:w-[255px]">
      <Image
        alt="search"
        src={"/icons/search.svg"}
        width={25}
        height={25}
        className="bg-none"
        onClick={onIconClick}
      />
      <input
        type="text"
        placeholder="Search"
        className="outline-none flex-grow bg-none max-sm:w-[10px] max-md:w-[170px]"
        value={searchQuery}
        onChange={handleChange}
        onClick={onInputClick}
      />
    </div>
  );
};

export default SearchInput;
