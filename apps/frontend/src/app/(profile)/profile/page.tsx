"use client";
import { EditProfile } from "@/components/Organisms/editProfile/EditPro";
import Post from "@/components/Organisms/ProfileUser/Post";
import SavedPost from "@/components/Organisms/ProfileUser/SavedPost";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { formattedData } from "@/utils/formattedData";
import { Toaster } from "@/components/ui/toaster";

interface PostType {
  _id: string;
  username: string;
  title: string;
  description: string;
  postImage: string;
  category: string;
  postlikedBy: string[];
  likeCounts: number;
  createdAt: number;
  saved: string[];
}

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
  saved: string[];
}
interface UserDataTypes {
  _id: string;
  username: string;
  email: string;
  work: string;
  saved: SavedType[];
  posts: PostType[];
  bio: string;
  gender: string;
  profile: string;
}

const Page = () => {
  const [view, setView] = useState<'Post' | 'SavedPost'>('Post');
  const [userData, setUserData] = useState<UserDataTypes | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/v1/users/profile', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data && response.data.user) {
        setUserData(response.data.user);
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/v1/users/post', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        const formattedPosts = formattedData(
          Array.isArray(response.data.data) ? response.data.data.filter((post: null) => post !== null) : []
        );

        if (formattedPosts.length === 0) {
          console.log('No posts available for this user.');
        }

        setUserData((prevUserData) => ({
          ...prevUserData!,
          posts: formattedPosts,
        }));
      } else {
        console.log('No posts available for this user.');
        setUserData((prevUserData) => ({
          ...prevUserData!,
          posts: [],
        }));
      }
    } catch (error: any) {
      console.error('Error fetching user posts:', error);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/v1/users/save', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        const formattedPosts = formattedData(
          Array.isArray(response.data.data) ? response.data.data.filter((saves: null) => saves !== null) : []
        );
        console.log(' posts available for this user.');
        if (formattedPosts.length === 0) {
          console.log('No posts available for this user.');
        }

        setUserData((prevUserData) => ({
          ...prevUserData!,
          saved: formattedPosts,
        }));
      } else {
        console.log('No posts available for this user.');
        setUserData((prevUserData) => ({
          ...prevUserData!,
          saved: [],
        }));
      }
    } catch (error: any) {
      console.error('Error fetching saved posts:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
    fetchSavedPosts();
   
  }, [view]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { username, work, saved, posts, profile, bio } = userData;

  return (
    <div className="content flex flex-col justify-center items-center">
      <div className="h-[90px]"></div>
      <div className="card-header w-[680px] min-sm:w-[230px] max-sm:w-[380px] h-[186px] shadow-sm rounded-2xl flex justify-between items-center relative border">
        <div className="header-left flex flex-row gap-4 pl-10">
          <div className="user-profile max-sm:mt-2">
            <Image
              alt="profile"
              src={profile || '/card-svg/avatar.svg'}
              width={98}
              height={98}
            />
          </div>
          <div className="user-info flex flex-col">
            <div className="user-name font-medium text-[30px] text-[#343A40] max-sm:text-[14px] ">
              {username}
            </div>
            <div className="been-post text-[#6C757D] text-[15px] font-sans flex flex-row gap-10">
              <p>{posts?.length || 0} Posts</p>
              <p>{saved?.length || 0} Saved</p>
            </div>
            <div className="Category text-[#623cbb] text-[15px] font-medium">
              {work}
            </div>
            <div className="bio text-[#6C757D] font-light text-base">
              {bio}
            </div>
          </div>
        </div>
        <div className="header-right pb-28 pr-8">
          <EditProfile />
        </div>
      </div>
      <div className="button-card w-[663px] max-sm:w-[350px] h-[70px] border-b flex flex-row justify-evenly items-center mt-4 ">
        <div
          className={`left hover:opacity-[60%] ${
            view === 'Post' ? 'text-purple-600 font-bold' : 'vxcvx'
          }`}
        >
          <button className="flex flex-row gap-1" onClick={() => setView('Post')}>
            <p>Post</p>
            <Image alt="post" src="/profile-page/postss.svg" height={24} width={24} />
          </button>
        </div>
        <div className="middle w-[0.2px] h-[100%] bg-gray-400"></div>
        <div
          className={`right hover:opacity-[60%] ${
            view === 'SavedPost' ? 'text-purple-600 font-bold' : ''
          }`}
        >
          <button className="flex flex-row gap-1" onClick={() => setView('SavedPost')}>
            <p>Saved</p>
            <Image alt="save" src="/profile-page/savee.svg" height={24} width={24} />
          </button>
        </div>
      </div>

      {/* Conditionally render Post or SavedPost */}
      <div className="content-section flex flex-col gap-2 mt-4">
        {view === 'Post' ? (
          posts.length > 0 ? (
            <Post posts={posts} />
          ) : (
            <div>No posts available.</div>
          )
        ) : (
          saved && saved.length > 0 ? (
            <SavedPost savedpost ={saved} />
          ) : (
            <div>No saved posts available.</div>
          )
        )}
      </div>
      <Toaster/>
    </div>
  );
};

export default Page;