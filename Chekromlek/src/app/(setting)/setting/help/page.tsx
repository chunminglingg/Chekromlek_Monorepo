'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button/Button";

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
  };

  return (
    <div className="flex flex-col lg:gap-2 mt-24">
      {/* User Setting */}
      <Link href={"http://localhost:3000/setting"}>
            <div className="flex flex-row gap-2 ml-2">
              <Image
                src={"/icons/arrow-back.svg"}
                alt="setting_icon"
                width={20}
                height={20}
              />
              <h1>Help Center</h1>
            </div>
          </Link>
          <hr className=" w-[370px]  lg:w-[460px] md:w-[430px] h-[2px] border-gray-300" />

      {/* Answer */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <p className=" mt-1 ms-[5%] text-slate-700 text-sm">
            You can always reach out if you want us to recommend something.
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="border shadow-lg w-[280px] p-2 lg:w-[360px] md:w-[330px] lg:pl-2 rounded-lg ml-16 md:ml-14 lg:ml-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col items-center lg:flex-row gap-4 lg:items-end">
            <textarea
              placeholder="Write your question here..."
              className="border shadow-lg lg:w-[360px] lg:h-[162px] h-[100px] w-[280px] md:ml-2 md:w-[330px] rounded-lg ml-5 lg:ml-5 pl-2 text-sm"
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
