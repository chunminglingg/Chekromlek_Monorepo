import React from "react";
import { PostCard } from "../postCard";

export default function Post() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <PostCard
          likeCounts={0}
          profile="/card-svg/avatar.svg"
          createdAt={0}
          username="Kimlang Tieng"
          description="Why is it  s it that although China is already the second largest  in the world..already the second largest  in the worldalready the second largest  in the worldthat although China is already the second largest  in the world"
          id={"1"}
          title="HELLO"
          onLike={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <PostCard
          likeCounts={0}
          profile="/card-svg/avatar.svg"
          createdAt={0}
          username="Kimlang Tieng"
          title="Why??"
          description="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"2"}
          onLike={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <PostCard
          likeCounts={0}
          profile="/card-svg/avatar.svg"
          createdAt={0}
          username="Kimlang Tieng"
          description="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"3"}
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
