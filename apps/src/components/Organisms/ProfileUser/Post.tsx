import React from "react";
import { PostCard } from "../postCard";

export default function Post() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <PostCard
          profile="/card-svg/avatar.svg"
          hour={2}
          username="Kimlang Tieng"
          caption="Why is it  s it that although China is already the second largest  in the world..already the second largest  in the worldalready the second largest  in the worldthat although China is already the second largest  in the world"
          id={"1"}
        />
        <PostCard
          profile="/card-svg/avatar.svg"
          hour={2}
          username="Kimlang Tieng"
          title="Why??"
          caption="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"2"}
        />
        <PostCard
          profile="/card-svg/avatar.svg"
          hour={2}
          username="Kimlang Tieng"
          caption="Why is it that although China is already the second largest  in the world."
          postImage="/socialMedia/imageContent.svg"
          id={"3"}
        />
      </div>
    </div>
  );
}
