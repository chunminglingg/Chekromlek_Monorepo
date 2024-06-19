"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Image from "next/image";
import Link from "next/link";

const SideStyle = ({
  session,
  sigSession,
}: {
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
}) => {
  // Determine if the user is logged in based on the presence of session and sigSession cookies
  const isLoggedIn = session && sigSession;

  return (
    <>
      <div className="home">
        <Link href={isLoggedIn ? "/" : "/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image
              alt="home"
              src={`/sideleft/home/index.svg`}
              height={24}
              width={24}
            />
            <span>Home</span>
          </button>
        </Link>
      </div>
      <div className="category">
        <Link href={isLoggedIn ? "/categories" : "/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image
              alt="category"
              src={`/sideleft/category/index.svg`}
              height={24}
              width={24}
            />
            <span>Categories</span>
          </button>
        </Link>
      </div>
      <div>
        <Link href={isLoggedIn ? "/notification" : "/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image
              alt="notification"
              src={`/sideleft/notification/index.svg`}
              height={24}
              width={24}
            />
            <span>Notification</span>
          </button>
        </Link>
      </div>
      <div>
        <Link href={isLoggedIn ? "/setting" : "/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image
              alt="setting"
              src={`/sideleft/setting/index.svg`}
              height={24}
              width={24}
            />
            <span>Setting</span>
          </button>
        </Link>
      </div>
     { isLoggedIn && ( <div className="md:hidden">
        <Link href="/login">
          <button
            className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
          >
            <Image
              alt="logout"
              src={"/login/logout.svg"}
              height={24}
              width={24}
            />
            <span className="text-red-600">Log out</span>
          </button>
        </Link>
      </div> )}
    </>
  );
};

export default SideStyle;
