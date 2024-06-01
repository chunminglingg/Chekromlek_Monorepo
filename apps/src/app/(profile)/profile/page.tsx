"use client";
import { EditProfile } from "@/components/Organisms/editProfile/EditPro";
import Post from "@/components/Organisms/ProfileUser/Post";
import SavedPost from "@/components/Organisms/ProfileUser/SavedPost";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [view, setView] = useState("Post");

  return (
    <>
      <div className="content flex flex-col justify-center items-center">
        <div className="h-[90px]"></div>
        <div className="card-header w-[680px] min-sm:w-[230px] max-sm:w-[380px] h-[186px] shadow-md rounded-2xl flex justify-between items-center relative border">
          <div className="header-left flex flex-row gap-4 pl-10">
            <div className="user-profile max-sm:mt-2">
              <Image
                alt="profile"
                src={"/card-svg/avatar.svg"}
                width={98}
                height={98}
              />
            </div>
            <div className="user-infor flex flex-col">
              <div className="user-name font-medium text-[30px] text-[#343A40] max-sm:text-[14px] ">
                Kimlang Tieng
              </div>
              <div className="been-post text-[#6C757D] text-[15px] font-sans flex flex-row gap-10">
                <p>82 Posts</p>
                <p>82 Answers</p>
              </div>
              <div className="Category text-[#623cbb] text-[15px] font-medium">
                #Web Designer
              </div>
              <div className="bio text-[#6C757D] font-light text-base">
                Here is my bio of my account
              </div>
            </div>
          </div>
          <div className="header-right pb-28 pr-8">
            <EditProfile />
          </div>
        </div>
        <div className="button-card w-[663px] max-sm:w-[350px] h-[70px] border-b flex flex-row justify-evenly items-center mt-4 ">
          <div
            className={`left hover:opacity-[60%] ${view === "Post" ? "text-purple-600 font-bold" : ""}`}
          >
            <button
              className="flex flex-row gap-1"
              onClick={() => setView("Post")}
            >
              <p>Post</p>
              <Image
                alt="post"
                src={"/profile-page/postss.svg"}
                height={24}
                width={24}
              />
            </button>
          </div>
          <div className="middle w-[0.2px] h-[100%] bg-gray-400"></div>
          <div
            className={`right hover:opacity-[60%] ${view === "SavedPost" ? "text-purple-600 font-bold" : ""}`}
          >
            <button
              className="flex flex-row gap-1"
              onClick={() => setView("SavedPost")}
            >
              <p>Saved</p>
              <Image
                alt="save"
                src={"/profile-page/savee.svg"}
                height={24}
                width={24}
              />
            </button>
          </div>
        </div>

        {/* Conditionally render Post or SavedPost */}
        <div className="content-section flex flex-col gap-2 mt-4">
          {view === "Post" ? <Post /> : <SavedPost />}
        </div>
      </div>
    </>
  );
};

export default Page;
