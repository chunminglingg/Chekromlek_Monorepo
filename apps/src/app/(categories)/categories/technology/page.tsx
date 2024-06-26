// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import PostCard, { postCardProps } from "@/components/Organisms/postCard/PostCard";
// import { Typography } from "@/components";
// import axios from "axios";

// const Technology = () => {
//   const [posts, setPosts] = useState<postCardProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/v1/post?page=${page}&limit=2&category=Technology`
//         );

//         // No need to check response.ok
//         const data = response.data; // Axios handles the JSON parsing
//         setPosts(data.posts || []); // Adjust this line based on your API response structure
//         setLoading(false);
//       } catch (error: any) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <div className="flex ms-3 w-auto h-auto mt-28">
//         <div className="flex flex-row justify-center h-[30%] w-[50px]">
//           <button className="mt-1">
//             <Link href={"/categories/"}>
//               <Image
//                 src={"/icons/arrow-back.svg"}
//                 alt="back"
//                 width={30}
//                 height={30}
//               />
//             </Link>
//           </button>
//         </div>
//         <div className="items-center flex-row">
//           <Typography fontSize="header" color="categories">
//            Technology
//           </Typography>
//         </div>
//       </div>
//       <div className="flex flex-col gap-2 mt-2">
//         {posts.length === 0 ? (
//           <p>No cards available</p>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               likeCounts={post.likeCounts}
//               profile={post.profile || "/card-svg/avatar.svg"}
//               createdAt={post.createdAt}
//               username={post.username}
//               title={post.title}
//               description={post.description}
//               postImage={post.postImage}
//               id={post.id}
//               category={post.category}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Technology;
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard, { postCardProps } from "@/components/Organisms/postCard/PostCard";
import { Typography } from "@/components";
import axios from "axios";

const Technology = () => {
  const [posts, setPosts] = useState<postCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/post?page=${page}&limit=2&category=Technology`
        );
        const data = response.data;
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.hasMore);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && !error) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, error]);

  if (loading && posts.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="flex ms-3 w-auto h-auto mt-28">
        <div className="flex flex-row justify-center h-[30%] w-[50px]">
          <button className="mt-1">
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
        <div className="items-center flex-row">
          <Typography fontSize="header" color="categories">Technology</Typography>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {posts.length === 0 ? (
          <p>No cards available</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              likeCounts={post.likeCounts}
              profile={post.profile || "/card-svg/avatar.svg"}
              createdAt={post.createdAt}
              username={post.username}
              title={post.title}
              description={post.description}
              postImage={post.postImage}
              id={post.id}
              category={post.category}
            />
          ))
        )}
      </div>
      <div ref={loadMoreRef}></div>
      {!hasMore && (
        <div className="text-center text-[14px] text-[#6C757D] m-4 border rounded-md h-[20%] bg-slate-200">
          No more cards
        </div>
      )}
    </div>
  );
};

export default Technology;
