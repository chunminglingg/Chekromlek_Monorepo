// import React, { ReactNode } from "react";

// interface InputSearchProps {
//   placeHolder?: string;
//   type?: string;
//   className?: string;
// }
// const InputSearch: React.FC<InputSearchProps> = ({
//   type,
//   placeHolder,
//   className,
// }) => {
//   const combinedClassName = `placeholder:text-slate-400  placeholder:text-[#D9D9D9] block bg-white w-full border border-slate-500 rounded-md py-3 pl-9 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm sm:hide ${className}`;
//   return (
//     <label className="relative block w-full mt-0">
//       <span className="absolute inset-y-0 left-0 flex items-center">
//         <svg
//           width="28"
//           height="28"
//           viewBox="0 0 32 32"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"

//         >
//           <circle cx="14.666" cy="14.6665" r="8" stroke="#343A40" />
//           <path
//             d="M14.666 10.6665C14.1407 10.6665 13.6206 10.77 13.1353 10.971C12.65 11.172 12.209 11.4666 11.8376 11.8381C11.4662 12.2095 11.1715 12.6505 10.9705 13.1358C10.7695 13.6211 10.666 14.1412 10.666 14.6665"
//             stroke="#343A40"
//             stroke-linecap="round"
//           />
//           <path
//             d="M26.666 26.6665L22.666 22.6665"
//             stroke="#343A40"
//             stroke-linecap="round"
//           />
//         </svg>
//       </span>
//       <input
//         className={combinedClassName}
//         placeholder= "Search..."
//         type={type}
//       />
//     </label>
//   );
// };
// export default InputSearch
//=========================================================================

"use client";

import React, { useState, useEffect } from "react";

const InputSearch: React.FC = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  



  useEffect(() => {
    // Check screen size on mount and resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Your search input change logic here
  //   const value = event.target.value;
  //   console.log("Input value:", value);
  //   // Check if input value exceeds 30 characters
  //   if (value.length <= 30) {
  //     // Update searchValue state
  //     setSearchValue(value);
  //     console.log(searchValue)
  //   }

  // };

  const handleIconClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="relative mt-[2%]">
      {isSmallScreen ? (
        <button
          type="button"
          className="absolute px-1 right-0 flex items-center justify-center w-12 h-full  bg-white rounded-md"
          onClick={handleIconClick}
        ></button>
      ) : (
        <label className="relative block w-[150%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-1">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14.666" cy="14.6665" r="8" stroke="#343A40" />
              <path
                d="M14.666 10.6665C14.1407 10.6665 13.6206 10.77 13.1353 10.971C12.65 11.172 12.209 11.4666 11.8376 11.8381C11.4662 12.2095 11.1715 12.6505 10.9705 13.1358C10.7695 13.6211 10.666 14.1412 10.666 14.6665"
                stroke="#343A40"
                stroke-linecap="round"
              />
              <path
                d="M26.666 26.6665L22.666 22.6665"
                stroke="#343A40"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-8 py-2 text-D9D9D9 rounded-md border border-zinc-500 shadow-sm focus:outline-none focus:ring focus:ring-blue-100"
            // value={searchValue}
            // onChange={handleInputChange}
           
          />
        </label>
      )}
    </div>
  );
};

export default InputSearch;
