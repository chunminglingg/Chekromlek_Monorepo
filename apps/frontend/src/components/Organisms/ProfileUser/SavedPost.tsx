import React from 'react';
import { PostCard } from '../postCard';

interface SavedType {
  _id: string;
  username: string;
  title: string;
  description: string;
  postImage: string;
  category: string;
  postlikedBy: string[];
  likeCounts: number;
  createdAt: number;
  saved: any[];
}
interface SavedProps {
  savedpost: SavedType[];
}

const SavedPost: React.FC<SavedProps> = ({ savedpost }) => {
  if (!Array.isArray(savedpost)) {
    console.error("posts is not an array:", savedpost);
    return <div>Error loading saved posts.</div>;
  }

  return (
    <div className="post-section w-full max-w-2xl mx-auto">
      {savedpost.map((saved) => (
        <PostCard
          key={saved._id}
          id={saved._id}
          username={saved.username}
          title={saved.title}
          description={saved.description}
          postImage={saved.postImage}
          category={saved.category}
          postlikedBy={saved.postlikedBy}
          likeCounts={saved.likeCounts}
          createdAt={saved.createdAt}
          onLike={() => console.log("Liked")}
          onSave={() => console.log("Saved")}
        />
      ))}
    </div>
  );
};

export default SavedPost;
