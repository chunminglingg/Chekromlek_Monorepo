"use client";
import { CreatePostDialog } from "@/components";
import Modal from "@/components/Molecules/Post/Modal/Modal";
import SearchInput from "@/components/Molecules/Search/SearchInput";
import { PostCard, PostCardList } from "@/components/Organisms";
import { ListofNew } from "@/components/Organisms/RangeofList";
import React, { useState } from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* <div className="items-start justify-start border-blue-500 rounded-lg">
          <ListofNew />
        </div> */}

        <div className="pt-[15%] max-sm:pt-[30%]">
          {/* <Modal/> */}
          <CreatePostDialog />
          {/* <SearchInput setSearch={setSearchQuery} /> */}
          <PostCardList/>
        </div>
      </div>
    </>
  );
};

export default page;
