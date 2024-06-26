import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// Define a type for the return value
interface UserData {
  isLogin: boolean;
  username: string;
}

const fetchUserData = async (
  session: RequestCookie | undefined,
  sigSession: RequestCookie | undefined,
  retries = 3,
  delay = 1000
): Promise<UserData> => {
  if (!session || !sigSession) {
    return { isLogin: false, username: "" };
  }

  try {
    const response = await axios.get("http://localhost:3000/v1/users/profile", {
      withCredentials: true,
      headers: {
        Cookie: `${session.name}=${session.value}; ${sigSession.name}=${sigSession.value}`,
      },
    });

    if (response.data) {
      return { isLogin: true, username: response.data.user.username };
    } else {
      return { isLogin: false, username: "" };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 503 && retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(res => setTimeout(res, delay));
      return fetchUserData(session, sigSession, retries - 1, delay * 2); // Exponential backoff
    } else {
      console.error('Error fetching user data:', error);
      return { isLogin: false, username: "" };
    }
  }
};

const NavFetching = async ({ session, sigSession }: { session: RequestCookie | undefined, sigSession: RequestCookie | undefined }) => {
  const { isLogin, username } = await fetchUserData(session, sigSession);
  return (
    <>
      <Nav isLogin={isLogin} username={username} session={session} sigSession={sigSession} />
    </>
  );
}

export { NavFetching };
