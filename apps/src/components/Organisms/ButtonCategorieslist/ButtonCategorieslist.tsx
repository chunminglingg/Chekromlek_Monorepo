import React from "react";
import { ButtonCategories } from "@/components/Molecules";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/Atoms";


const ButtonCategorieslist = () => {
  return (
    <div className="">
            <div className="flex flex-wrap justify-center lg:flex lg:flex-col">
            <div className="flex justify-start mt-4 gap-4 ml-4 lg:hidden">
              <Image src="/svg/Arrow.svg" alt="Your Icon" width={20} height={20} />
              <Typography fontSize="bold">Categories</Typography>
            </div>

            </div>
    </div>
  );
};

export default ButtonCategorieslist;
