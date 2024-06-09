"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import PostCard, { postCardProps } from "./PostCard"; // Assuming PostCard component is imported correctly
import PostCardSkeleton from "./CardSkeleton"; // Importing the Skeleton component
import { MyCardContext } from "@/contexts/PostCardContext/PostCardContext"; // Assuming correct path

const PostCardList = ({ searchQuery = "" }) => {
  const { CardInfo, nextToken, fetchMoreCards } = useContext(MyCardContext); // Updated context to include nextToken and fetchMoreCards
  const [loading, setLoading] = useState(false);
  const [displayedCards, setDisplayedCards] = useState<postCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only load cards if CardInfo is populated
    if (CardInfo.length > 0) {
      loadMoreCards();
    }
  }, [CardInfo]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMoreCards();
      }
    };

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, displayedCards]);

  const loadMoreCards = () => {
    setLoading(true);

    // Simulate an API call to fetch more cards
    fetchMoreCards(nextToken)
      .then((newCardData: { newCards: any; newNextToken: any; }) => {
        const { newCards, newNextToken } = newCardData;

        setDisplayedCards((prev) => [...prev, ...newCards]);
        setLoading(false);

        if (newCards.length < 5) {
          setHasMore(false);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching more cards:", error);
        setLoading(false);
      });
  };

  const filteredCardInfo = CardInfo.filter((info) => {
    return searchQuery.trim() === ""
      ? info
      : info.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (info.caption !== undefined &&
            info.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (info.title !== undefined &&
            info.title.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-4">
      {displayedCards.map((info) => (
        <PostCard
          key={info.id}
          id={info.id}
          hour={info.hour}
          caption={info.caption}
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
      {!hasMore && (
        <div className="text-center text-[14px] text-[#6C757D] m-4 border rounded-md h-[20%] bg-slate-200">No more cards</div>
      )}
      <div ref={loadMoreRef} className="text-center text-[20px] text-[#6C757D] m-4 rounded-md h-[35%] ">Loading...</div>
    </div>
  );
};

export default PostCardList;
