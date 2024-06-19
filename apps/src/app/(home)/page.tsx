// app/page.tsx
import React from 'react';
import PageContent from '@/components/Organisms/PageContent/PageContent';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface pageProps {
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
}

const Page: React.FC<pageProps> = ({session , sigSession}) => {
  
  let isLoggedIn = true;
  if (!session || !sigSession) {
    isLoggedIn = false;
  } 
  return (
    <PageContent isLoggedIn={isLoggedIn} />
  );
};

export default Page;
