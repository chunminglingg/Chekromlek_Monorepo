'use client'
'use client'
import Image from "next/image";
import React, { useState } from "react";

type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps>= ({setSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
     setSearch(e.target.value);
  };
  return (
    <>
      <div className="flex flex-row items-center border border-gray-300 rounded-md p-2 ms-[8%]  lg:ms-[16%] lg:w-[390px]  md:w-[290px] max-sm:ms-[2%] mix-md:w-[420px] sm:w-[255px]">
        <Image
          alt="cancel"
          src={"/icons/search.svg"}
          width={25}
          height={25}
          className="bg-none"
        />
        <input
          type="text"
          placeholder="Search"
          className="outline-none flex-grow bg-none  max-sm:w-[10px] max-md:w-[170px]"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SearchInput;