"use client";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import ViewPost, { ViewPostProps } from "@/components/Molecules/Post/ViewPost/ViewPost";
import { useParams } from "next/navigation";
import { UserCard } from "@/components/Organisms/postCard/UserAnswer/UserCard";

const ViewPostPage = () => {
  const [post, setPost] = useState<ViewPostProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams(); 
  console.log(postId);

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/post/getpost/${postId}` , {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      
      setPost(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post. Please try again later.</div>;
  }

 console.log(post)
  return (
    <div className="max-sm:mt-[8%] sm:mt-[14%] md:mt-[10%] max-md:mt-[10%] lg:mt-[7%] min-lg:mt-[9%]">
      <div className="w-[550px] xxl:w-[700px] xl:w-[650px] lg:w-[600px] md:w-[550px] sm:w-[500px]  max-sm:w-[345px] max-sm:mt-[20%] min-sm:mt-[20%] h-auto border rounded-md max-md:mt-[5%]">
        {
          post ? <div className="flex flex-col">
          <ViewPost
            id={postId}
            profile={post.profile || "/profile.svg"}
            hour={post.hour || 2}
            username={post.username || "Unknown"}
            postImage={post.postImage}
            title={post.title || "none"}
            description={post.description ||"none"}
          />
        </div> : <div></div>
        }
      </div>
    </div>
  );
};

export default ViewPostPage;