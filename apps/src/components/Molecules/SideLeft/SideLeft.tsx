"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideStyle = ({
  session,
  sigSession,
}: {
  session: RequestCookie | undefined;
  sigSession: RequestCookie | undefined;
}) => {
  // Determine if the user is logged in based on the presence of session and sigSession cookies
  const isLoggedIn = session && sigSession;
  const pathname = usePathname();
  const isHome = pathname === "/"
  const isCategory = pathname === "/categories"
  const isNotification = pathname === "/notification"
  const isSetting = pathname === "/setting";


  return (
    <>
      <div className="home">
        <Link href={isLoggedIn ? "/" : "/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image
              alt="home"
              src={isHome ? `/sideleft/home/after.svg` : `/sideleft/home/index.svg`}
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
              src={isCategory ? `/sideleft/category/after.svg` : `/sideleft/category/index.svg`}
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
              src={isNotification ? `/sideleft/notification/after.svg` : `/sideleft/notification/index.svg`}
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
              src={isSetting ? `/sideleft/setting/after.svg`: `/sideleft/setting/index.svg`}
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
