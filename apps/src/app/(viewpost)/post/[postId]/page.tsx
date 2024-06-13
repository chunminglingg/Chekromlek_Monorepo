"use client";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import ViewPost, {
  postCardProps,
} from "@/components/Molecules/Post/ViewPost/ViewPost";
import { useParams } from "next/navigation";

const ViewPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/post/getpost/${postId}`
      );
      setPost(response.data);
      setLoading(false);
    } catch (err) {
      setError(error);
      setLoading(false);
    }
  };

  if (!loading && error) {
    return <div>Error loading post. Please try again later.</div>;
  }

  if (!loading && !post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-sm:mt-[8%] sm:mt-[14%] md:mt-[10%] max-md:mt-[10%] lg:mt-[7%] min-lg:mt-[9%]">
      <div className="w-[430px] max-sm:w-[345px] max-sm:mt-[20%] min-sm:mt-[20%] h-auto border rounded-md translate-x-1 max-md:mt-[5%]">
        <div className="flex flex-col ">
          <ViewPost
            key={post.id}
            profile={post.profile}
            hour={post.hour || 2}
            username={post.username || "Unknown"}
            postImage={post.postImage || '/socialMedia/imageContent.svg'}
            title={post.title}
            description={post.caption}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPostPage;
