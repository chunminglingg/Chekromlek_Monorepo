import { PostCard } from "@/components/Organisms";
import { EditProfile } from "@/components/Organisms/editProfile/EditPro";
import Image from "next/image";
import React from "react";

const page = () => {
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
            {/* <button className="px-2 py-2 rounded-2xl text-[#343A40] border border-gray-300 hover:bg-gray-300">
              Edit profile
            </button> */}
          </div>
        </div>
        <div className="button-card w-[663px] max-sm:w-[350px] h-[70px] border-b flex flex-row justify-evenly items-center mt-4 ">
          <div className="left hover:opacity-[60%]">
            <button className="flex flex-row gap-1">
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
          <div className="right hover:opacity-[60%]">
            <button className="flex flex-row gap-1">
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

        {/* postCard */}
        <div>
          <div className="flex flex-col gap-2 mt-4">
            <PostCard
              profile="/card-svg/avatar.svg"
              hour={2}
              username="Kimlang Tieng"
              caption="Why is it that although China is already the second largest  in the world."
              postImage="/socialMedia/imageContent.svg"
            />
            <PostCard
              profile="/card-svg/avatar.svg"
              hour={2}
              username="Kimlang Tieng"
              caption="Why is it  s it that although China is already the second largest  in the world..already the second largest  in the worldalready the second largest  in the worldthat although China is already the second largest  in the world"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
