"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PostCard, { postCardProps } from "./PostCard"; // Ensure this is the correct path to your PostCard component
import PostCardSkeleton from "./CardSkeleton";

const PostCardList = () => {
  const [loading, setLoading] = useState(false);
  const [displayedCards, setDisplayedCards] = useState<postCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMoreCards();
  }, []);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && !error) {
        loadMoreCards();
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
  }, [loading, hasMore]);

  const loadMoreCards = async () => {
    console.log("fetch");

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/post?page=${page}&limit=5`
      );
      const { posts, hasMore: morePosts } = response.data; // Destructure according to expected structure
      // console.log("Posts:", posts, "Has More:", morePosts);
      console.log("response:", response);

      if (posts.length > 0) {
        setDisplayedCards((prev) => [...prev, ...posts]);
        setPage(page + 1);
        setHasMore(morePosts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more cards:", error);
      setError("Failed to load more cards. Please try again later.");
      setLoading(false);
    }
  };

  console.log("error", error);
  console.log("loading", loading);
  console.log("hasMore", hasMore);
  console.log("hasMore", page);

  return (
    <div className="space-y-4">
      {displayedCards.map((info, index) => (
        <PostCard
          key={index}
          id={info.id}
          hour={info.hour}
          likeCounts={info.likeCounts}
          description={info.description}
          profile={info.profile}
          username={info.username}
          postImage={info.postImage}
          title={info.title}
          onLike={() => console.log("Liked")}
          onSave={() => console.log("Saved")}
        />
      ))}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!hasMore && (
        <div className="text-center text-[14px] text-[#6C757D] m-4 border rounded-md h-[20%] bg-slate-200">
          No more cards
        </div>
      )}
      {!loading && hasMore && !error && (
        <div
          ref={loadMoreRef}
          className="text-center text-[20px] text-[#6C757D] m-4 rounded-md h-[35%] "
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default PostCardList;
