import React from 'react';
import { PostCard } from '../postCard';

interface PostType {
  _id: string;
  username: string;
  title: string;
  description: string;
  postImage: string;
  category: string;
  postlikedBy: string[];
  likeCounts: number;
  createdAt: string;
  answers: any[];
}

interface PostProps {
  posts: PostType[];
}

const Post: React.FC<PostProps> = ({ posts }) => {
  if (!Array.isArray(posts)) {
    console.error("posts is not an array:", posts);
    return <div>Error loading posts.</div>;
  }

  return (
    <div className="post-section w-full max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          _id={post._id}
          username={post.username}
          title={post.title}
          description={post.description}
          postImage={post.postImage}
          category={post.category}
          postlikedBy={post.postlikedBy}
          likeCounts={post.likeCounts}
          createdAt={post.createdAt}
          onLike={() => console.log("Liked")}
          onSave={() => console.log("Saved")}
        />
      ))}
    </div>
  );
};

export default Post;
