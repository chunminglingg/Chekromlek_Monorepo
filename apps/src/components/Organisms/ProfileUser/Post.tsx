// src/components/Organisms/ProfileUser/Post.tsx
'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostCard } from "../postCard";

interface PostType {
  id: string;
  title: string;
  content: string;
  profile?: string;
  hour?: number;
  username: string;
  postImage?: string;
}

interface ApiResponse {
  message: string;
  data: PostType[]; // Assuming data contains an array of PostType
}

interface PostProps {
  userId: string; // Expecting the user ID as a prop
}

const Post: React.FC<PostProps> = ({ userId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `http://localhost:3000/v1/post/getpost/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data); // Log the entire response

        if (response.data.message === "Post found successfully") {
          setPosts(response.data.data); // Set posts based on data array
        } else {
          console.error("API response is not as expected:", response.data);
          setError("Invalid response format from API");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  console.log("Fetched posts:", posts); // Debugging log

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      {posts.map((post) => (
        <PostCard
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
          }}
          onSave={() => {
            console.log(`Saved post ${post.id}`);
          }}
          likeCounts={0}
        />
      ))}
    </div>
  );
};

export default Post;
