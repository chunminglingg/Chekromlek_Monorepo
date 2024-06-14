"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div>
    <div className="sidebar items-start justify-around">
      <div className="home">
        <Link href="/afterlogin">
          <button
            className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
          >
            <Image
              alt="home"
              src={pathname === '/afterlogin' ? '/sideleft/home/after.svg' : '/sideleft/home/index.svg'}
              height={24}
              width={24}
            />
            <span>Home</span>
          </button>
        </Link>
      </div>

      <div className="category">
        <Link href="/categories">
          <button
            className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
          >
            <Image
              alt="category"
              src={pathname === '/categories' ? '/sideleft/category/after.svg' : '/sideleft/category/index.svg'}
              height={24}
              width={24}
            />
            <span>Categories</span>
          </button>
        </Link>
      </div>

      <div className="notification">
        <Link href="/notification">
          <button
            className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
          >
            <Image
              alt="notification"
              src={pathname === '/notification' ? '/sideleft/notification/after.svg' : '/sideleft/notification/index.svg'}
              height={24}
              width={24}
            />
            <span>Notification</span>
          </button>
        </Link>
      </div>

      <div className="setting">
        <Link href="/setting">
          <button
            className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
          >
            <Image
              alt="setting"
              src={pathname === '/setting' ? '/sideleft/setting/after.svg' : '/sideleft/setting/index.svg'}
              height={24}
              width={24}
            />
            <span>Setting</span>
          </button>
        </Link>
      </div>
      
    </div>
    <div className='md:hidden'>
    <Link href="/login">
        <button
          className={`flex flex-row gap-2 items-start px-4 py-4 group rounded-xl w-[250px] hover:bg-gray-200 text-[#343A40]`}
        >
          <Image
            alt="logout"
            src={'/login/logout.svg'}
            height={24}
            width={24}
          />
          <span className='text-red-600'>Log out</span>
        </button>
      </Link>
    </div>
    </div>
  );
};

export default Sidebar;
