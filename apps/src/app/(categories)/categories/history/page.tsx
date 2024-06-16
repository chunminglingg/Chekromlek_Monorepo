import React from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/Organisms/postCard/PostCard";
const History = () => {
  return (
    <div>
    <div className="flex ms-3 w-auto h-auto">
      <div className="flex justify-center h-[30%] w-[50px] mt-1">
        <button>
          <Link href={"/categories/"}>
            <Image
              src={"/icons/arrow-back.svg"}
              alt="back"
              width={30}
              height={30}
            />
          </Link>
        </button>
      </div>
      <div className="items-center w-[420px] flex-row">
        <p className="text-purple-600 font-bold text-[23px]">Biology</p>
      </div>
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <PostCard
      likeCounts={0}
        profile="/card-svg/avatar.svg"
        createdAt={2}
        username="Kimlang Tieng"
        description="Why is it  s it that although China is already the second largest  in the world..already the second largest  in the worldalready the second largest  in the worldthat although China is already the second largest  in the world"
        id={"1"}
       
      />
      <PostCard
      likeCounts={0}
        profile="/card-svg/avatar.svg"
        createdAt={2}
        username="Kimlang Tieng"
        description="Why is it that although China is already the second largest  in the world."
        postImage="/socialMedia/imageContent.svg"
        id={"2"}
       
      />
      <PostCard
      likeCounts={0}
        profile="/card-svg/avatar.svg"
        createdAt={2}
        username="Kimlang Tieng"
        description="Why is it that although China is already the second largest  in the world."
        postImage="/socialMedia/imageContent.svg"
        id={"3"}
        
      />
    </div>
  </div>
  );
};

export default History;
