import React from "react";
import Link from "next/link";
import Image from "next/image";
const Mental = () => {
  return (
    <div className="flex ms-3 w-[450px%] h-[90px] items-center justify-start">
      <div className="flex justify-center h-[30%] w-[50px]">
        <button>
          <Link href={"http://localhost:3000/categories/"}>
            <Image
              src={"/icons/arrow-back.svg"}
              alt="back"
              width={30}
              height={30}
            />
          </Link>
        </button>
      </div>
      <div className="items-center w-[420px]">
        <p className="text-purple-600 font-bold text-[23px]">Mental</p>
      </div>
    </div>
  );
};

export default Mental;
