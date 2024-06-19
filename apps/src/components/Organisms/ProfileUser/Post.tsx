<<<<<<< HEAD
'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
=======
import React from "react";
>>>>>>> f4d792f1a742eaba90b5bd5a617c672d68f2988b
import { PostCard } from "../postCard";

export default function Post() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <PostCard
<<<<<<< HEAD
          key={post.id}
          profile={post.profile || "/card-svg/avatar.svg"}
          hour={post.hour || 2}
          username={post.username}
          description={post.content}
          id={post.id}
          title={post.title}
          postImage={post.postImage}
          onLike={() => {
            console.log(`Liked post ${post.id}`);
=======
          likeCounts={0}
          profile="/card-svg/avatar.svg"
          createdAt={0}
          username="Kimlang Tieng"
          description="Why is it  s it that although China is already the second largest  in the world..already the second largest  in the worldalready the second largest  in the worldthat although China is already the second largest  in the world"
          id={"1"}
          title="HELLO"
          onLike={function (): void {
            throw new Error("Function not implemented.");
>>>>>>> f4d792f1a742eaba90b5bd5a617c672d68f2988b
          }}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
<<<<<<< HEAD
      ))}
=======
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
>>>>>>> f4d792f1a742eaba90b5bd5a617c672d68f2988b
    </div>
  );
}
