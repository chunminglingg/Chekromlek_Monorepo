// app/page.tsx
import React from "react";
import PageContent from "../../components/Organisms/PageContent/PageContent";

interface pageProps {
  params?: any;
  searchParams?: any;
  // session?: RequestCookie | undefined;
  // sigSession?: RequestCookie | undefined;
}

const Page: React.FC<pageProps> = ({ params, searchParams }) => {
  let isLoggedIn = true;
  if (!params || !searchParams) {
    isLoggedIn = false;
  }
  return <PageContent isLoggedIn={isLoggedIn} />;
};

export default Page;
