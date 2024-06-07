import React from "react";
import PostCard from "../postCard/PostCard";

export default function savedPost() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <PostCard
          profile="/card-svg/avatar.svg"
          hour={2}
          username="SaNa ViDa"
          caption="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"1"}
          onLike={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
