import { Alert } from "@/components/Molecules/fix/alert";
import { PostCard, PostCardList } from "@/components/Organisms";
import React from "react";

const page = () => {


  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-[7%] min-md:mt-[12%] max-lg:mt-[8%] max-md:mt-[15%] max-sm:mt-[20%] mb-5 ">
          <PostCardList/>
         {/* <div className="mt-[-50%]">
           <Alert/>
         </div> */}
      </div>
    </>
  );
};

export default page;
