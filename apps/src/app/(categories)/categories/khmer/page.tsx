"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard, {postCardProps} from "@/components/Organisms/postCard/PostCard";

const Khmer = () => {
  const [posts, setPosts] = useState<postCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/v1/post?page=${page}&limit=2&category=Writing`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
       
        const data = await response.json();
        setPosts(data.posts); // Adjust this line based on your API response structure
        setPage(page + 1);
        setLoading(false);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          <p className="text-purple-600 font-bold text-[23px]">Khmer</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-12">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            likeCounts={post.likeCounts}
            profile={post.profile || "/card-svg/avatar.svg"}
            createdAt={post.createdAt}
            username={post.username}
            description={post.description}
            postImage={post.postImage}
            id={post.id}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Khmer;
