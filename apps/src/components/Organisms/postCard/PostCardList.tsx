"use client"
import React, { useContext } from 'react';
import PostCard from './PostCard'; // Assuming PostCard component is imported correctly
import { MyCardContext } from '@/contexts/PostCardContext/PostCardContext'; // Assuming correct path

const PostCardList= ({searchQuery = "" }) => {
  const { CardInfo } = useContext(MyCardContext);

  return (
    <div className='space-y-4'>
      {CardInfo.filter(info => {
        return searchQuery.trim() === ""?
        info: info.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (info.caption!== undefined && info.caption.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (info.title!== undefined && info.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }).map((info) => (
        <PostCard
          key={info.id}
          id={info.id}
          hour={info.hour}
          caption={info.caption}
          profile={info.profile}
          username={info.username}
          postImage={info.postImage}
          title={info.title} 
          onLike={function (): void {
            throw new Error('Function not implemented.');
          } } onSave={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </div>
  );
};

export default PostCardList;
