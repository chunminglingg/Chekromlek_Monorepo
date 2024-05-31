'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";
import { Typography } from "@/components/Atoms/Typography/Typography";

export default function Page() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Gather the data
    const formData = {
      email,
      question,
    };

    // Do something with the form data, like sending it to a server
    console.log("Form data:", formData);
    setEmail("");
    setQuestion("");
  };


  return (
    <div className="flex flex-col w-[40%] max-sm:w-[70%] max-md:w-[60%] min-md:w-[60%] max-lg:w-[60%] lg:gap-2 mt-[8%] max-sm:gap-3 max-md:gap-3 md:gap-3 max-md:mt-[12%] max-sm:mt-[20%] max-lg:mt-[10%] ">
    {/* User Setting */}
    <Link href={"/setting"}>
        <div className="flex items-end justify-start border-b-2 mt-4 py-2 border-gray-300  gap-2 ">
          <Image
            src={"/icons/arrow-back.svg"}
            alt="setting_icon"
            width={25}
            height={25}
          />
          <p className=" items-center justify-center text-[18px] font-semibold text-slate-700">
            Help
          </p>
        </div>
      </Link>
  
    {/* Answer */}
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
    <Typography align="center">
        You can always reach out if you want us to recommend something.
    </Typography>
      <input
        type="email"
        placeholder="Input your email"
        className="border shadow-lg w-full max-w-xs  p-2 rounded-lg text-sm mt-3 focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Write your problems here..."
        className="border shadow-lg h-[150px] w-full max-w-xs rounded-lg text-sm mt-3 p-2 focus:outline-none"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="flex justify-end w-full max-w-xs mt-3">
        <Button size="sm" type="submit"  colorScheme="primary" rounded="lg" className="hover:opacity-80">
          <Typography fontSize="normal" color="submit">
            Submit
          </Typography>
        </Button>
      </div>
    </form>
  </div>
  
  );
}
