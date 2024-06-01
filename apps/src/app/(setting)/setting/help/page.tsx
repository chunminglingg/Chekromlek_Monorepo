'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";
import { Typography } from "@/components/Atoms/Typography/Typography";

export default function Page() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: any) => {
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
    <div className="flex flex-col lg:gap-2 mt-24">
      {/* User Setting */}
      <Link href={"/setting"}>
        <div className="flex items-end lg:ml-[85px] justify-start border-b-2 mt-4 py-2 border-gray-300 gap-2">
          <Image
            src={"/icons/arrow-back.svg"}
            alt="setting_icon"
            width={24}
            height={24}
          />
          <Typography fontSize="title" className="items-center justify-center" >Help center</Typography>
        </div>
      </Link>

      {/* Answer */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Typography fontSize="normal" className="mt-1 ms-[5%] text-slate-700 lg:ml-[62px]">You can always reach out if you want us to recommend something.</Typography>
          <input
            type="email"
            placeholder="Your email"
            className="border shadow-lg w-[280px] p-2 lg:w-[360px] md:w-[330px] lg:pl-2 rounded-lg ml-16 md:ml-14 lg:ml-[82px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col items-center lg:flex-row gap-4 lg:items-end">
            <textarea
              placeholder="Write your question here..."
              className="border shadow-lg lg:w-[360px] lg:h-[162px] h-[100px] w-[280px] md:ml-2 md:w-[330px] rounded-lg ml-5 lg:ml-[82px] pl-2 text-sm"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" className="p-2 hover:opacity-70" background="bg-violet-500">
              <p className="text-white">Submit</p>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
