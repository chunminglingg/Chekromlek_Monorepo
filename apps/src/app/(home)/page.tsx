import { PostCard, PostCardList } from "@/components/Organisms";
import React from "react";

const page = () => {

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-[8%] max-lg:mt-[8%] max-md:mt-[15%] max-sm:mt-[20%] ">
          <PostCardList/>
      </div>
    </>
  );
};

export default page;