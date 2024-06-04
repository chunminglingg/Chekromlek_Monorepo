// "use client"
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { SearchInput } from "@/components/Molecules";
// // Define the interfaces for the components
// export interface AfterLoginProps {
//   name?: string;
// }
// export interface BurgerProps {}
// export interface LogoProps {}
// export interface SearchInputProps {
//   setSearch: (query: string) => void;
// }

// export interface NavAfterProps {
//   AfterLogin: React.FC<AfterLoginProps>;
//   Burger: React.FC<BurgerProps>;
//   Logo: React.FC<LogoProps>;
//   SearchInput: React.FC<SearchInputProps>;
// }

// const NavAfter: React.FC<NavAfterProps> = ({ AfterLogin, Burger, Logo, SearchInput }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   return (
//     <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-20">
//       <div className="px-3 py-3 lg:px-5 lg:pl-10 flex justify-between">
//         <div className="flex flex-row gap-4 items-center">
//           <Link href={"/afterlogin"}>
//             <Logo />
//           </Link>
//         </div>
//         <div className="mt-2 max-sm:me-[20%] max-md:me-[35%] max-sm:w-[160px]">
//           <SearchInput setSearch={setSearchQuery} />
//         </div>
//         <div className="hidden md:flex md:flex-row gap-4 items-center pr-8">
//           <AfterLogin name="Default Name" />
//           <Link href={"#"}>
//             <Image src={"/icons/lan.svg"} alt="language" width={34} height={34} />
//           </Link>
//         </div>
//         <div className="block md:hidden mt-4 absolute right-5">
//           <Burger />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavAfter;
'use client'
import { AfterLogin, Burger } from "@/components/Atoms";
import {BurgerLogin} from "@/components/Atoms";
import Logo from "@/components/Atoms/Logo/Logo";
import SearchInput from "@/components/Molecules/Search/SearchInput";
import InputSearch from "@/components/Molecules/Search/SearchInput";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function NavAfter() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-20 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-10 flex justify-between">
        <div className="flex flex-row gap-4 items-center">
          <Link href={"/afterlogin"}>
            <Logo />
          </Link>
        </div>
        <div className=" mt-2   max-sm:me-[20%] max-md:me-[35%] max-sm:w-[160px]">
          <SearchInput setSearch={setSearchQuery}/>
        </div>
      <div className="hidden md:flex md:flex-row gap-4 items-center pr-8">
       
          <AfterLogin/>
          <Link href={"#"}>
            <Image
              src={"/icons/lan.svg"}
              alt="languese"
              width={34}
              height={34}
            />
          </Link>
        </div>
        <div className="block md:hidden   mt-4 absolute right-5">
          <BurgerLogin/>
        </div>
      </div>
    </nav>
  );
}

export default NavAfter;
