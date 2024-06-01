import React, { useState } from "react";
import Link from "next/link";

export interface AfterLoginProps {
  name?: string;
}

const AfterLogin: React.FC<AfterLoginProps> = ({ name = 'Default Name' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Truncate the displayed name to 4 characters
  const displayedName = name.substring(0, 4);

  return (
    <>
      <div className="relative">
        <button
          className="flex flex-row gap-2 w-auto px-4 h-[50px] items-center justify-center rounded-xl shadow-md hover:border-[#D9D9D9] hover:border"
          onClick={toggleDropdown}
        >
          {displayedName}
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 15L12 9L6 15" stroke="#33363F" strokeWidth="2" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="#33363F" strokeWidth="2" />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-auto px-24 shadow-md rounded-md bg-white z-55 pl-2 left-0">
            <ul className="px-2 py-5 flex flex-col gap-4">
              <li>
                <Link href="/profile">
                  <button className="hover:font-medium">Profile</button>
                </Link>
              </li>
              <li>
                <Link href="/setting">
                  <button className="hover:font-medium">Setting</button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <button className="text-red-400 hover:font-medium items-start justify-start">LogOut</button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AfterLogin;
