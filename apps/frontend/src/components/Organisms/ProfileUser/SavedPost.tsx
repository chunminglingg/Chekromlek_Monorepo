import React from "react";
import PostCard from "../postCard/PostCard";

export default function savedPost() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <PostCard
          likeCounts={2}
          profile="/card-svg/avatar.svg"
          createdAt={2}
          username="SaNa ViDa"
          description="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"1"}
          onLike={function (): void {
            throw new Error("Function not implemented.");
          } }
          onSave={function (): void {
            throw new Error("Function not implemented.");
          } } category={""}        />
      </div>
    </div>
  );
}
