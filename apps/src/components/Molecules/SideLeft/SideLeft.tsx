"use client";
import Image from "next/image";
import Link from "next/link";

const SideStyle = () => {
  return (
    <>
      <div className="home">
        <Link href={"/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image alt="home" src={`/sideleft/home/index.svg`} height={24} width={24} />
            <span>Home</span>
          </button>
        </Link>
      </div>
      <div className="category">
        <Link href={"/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image alt="category" src={`/sideleft/category/index.svg`} height={24} width={24} />
            <span>Categories</span>
          </button>
        </Link>
      </div>
      <div>
        <Link href={"/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image alt="notification" src={`/sideleft/notification/index.svg`} height={24} width={24} />
            <span>Notification</span>
          </button>
        </Link>
      </div>
      <div>
        <Link href={"/signup"}>
          <button className="flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]">
            <Image alt="setting" src={`/sideleft/setting/index.svg`} height={24} width={24} />
            <span>Setting</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default SideStyle;
