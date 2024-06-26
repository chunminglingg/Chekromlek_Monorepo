'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Language = () => {
  const [language, setLanguage] = useState("English"); // Initial language

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[60%] lg:gap-2 mt-24 max-sm:gap-3 max-md:gap-3 md:gap-3   max-md:mt-[12%] max-sm:mt-[20%] max-lg:mt-[10%] ">
      {/* Language */}
      <Link href={"/setting"}>
        <div className="flex items-end justify-start border-b-2 mt-4 py-2 border-gray-300  gap-2 ">
          <Image
            src={"/icons/arrow-back.svg"}
            alt="setting_icon"
            width={25}
            height={25}
          />
          <p className=" items-center justify-center text-[18px] font-semibold text-slate-700">
            Language
          </p>
        </div>
      </Link>

      {/* Language options */}
      <div className="flex flex-col gap-2 mt-5">
        <div
          className={`w-auto h-[50px] flex items-center justify-between border rounded-md cursor-pointer ${
            language === "English" ? "bg-gray-100" : ""
          }`}
          onClick={() => handleLanguageChange("English")}
        >
          <div className="flex ms-2 gap-5">
            <Image src={"/icons/eng.svg"} alt="eng" width={35} height={35} />
            <button
              className={`px-4 py-2 rounded-md ${
                language === "English" ? "text-black" : ""
              }`}
            >
              English
            </button>
          </div>
          {language === "English" && (
            <div className="me-2">
              <Image src={"/icons/correct.svg"} alt="correct" width={24} height={24} />
            </div>
          )}
        </div>

        <div
          className={`w-auto h-[50px] flex items-center justify-between border rounded-md cursor-pointer ${
            language === "Khmer" ? "bg-gray-100" : ""
          }`}
          onClick={() => handleLanguageChange("Khmer")}>
            
          <div className="flex ms-2 gap-5">
            <Image src={"/icons/kh.svg"} alt="khmer" width={35} height={35} />
            <button
              className={`px-4 py-2 rounded-md ${
                language === "Khmer" ? "text-black" : ""
              }`}
            >
              Khmer
            </button>
          </div>
          {language === "Khmer" && (
            <div className="me-2">
              <Image src={"/icons/correct.svg"} alt="correct" width={24} height={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Language;
