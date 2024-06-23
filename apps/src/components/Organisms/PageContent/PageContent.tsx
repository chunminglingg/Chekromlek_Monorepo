// components/PageContent.tsx
'use client';

import React from 'react';
import { CreatePostDialog } from '@/components';
import { PostCardList } from '@/components/Organisms';

interface PageContentProps {
  isLoggedIn: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ isLoggedIn }) => {
  return (
    <div className="flex flex-col gap-2 items-center mt-[7%] min-md:mt-[12%] max-lg:mt-[8%] max-md:mt-[15%] max-sm:mt-[20%] mb-5">
      {isLoggedIn && <CreatePostDialog />}
      <PostCardList />
    </div>
  );
};

export default PageContent;
