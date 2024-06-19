// components/Organisms/navbar/NavFetching.tsx
import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


const fetchUserData = async (
  session: RequestCookie | undefined,
  sigSession: RequestCookie | undefined
) => {
  if (!session || !sigSession) {
    return { isLogin: false, username: "" };
  }
  const response = await axios.get("http://localhost:3000/v1/users/profile", {
    withCredentials: true,
    headers: {
      Cookie: `${session!.name}=${session!.value}; ${sigSession!.name}=${
        sigSession!.value
      }`,
    },
  });
  if (response.data) {
    return { isLogin: true, username: response.data.user.username };
  } else {
    return { isLogin: false, username: "" };
  }
};

const NavFetching = async ({session, sigSession}: { session: RequestCookie | undefined, sigSession: RequestCookie | undefined}) => {
    const { isLogin, username } = await fetchUserData(session, sigSession);
    return (
        <>
            <Nav isLogin={isLogin} username={username} session={session} sigSession={sigSession}/>
        </>
    )
}

export { NavFetching }
