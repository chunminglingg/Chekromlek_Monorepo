import React from "react";
import Image from "next/image";
import { Typography } from "@/components";

export default function UserMaintenance() {
  return (
                                                              //w-screen
    <div className="flex items-center justify-center  h-screen ">  
      <div className="flex flex-col items-center justify-center gap-4">
        <Image alt="panel" src={"/login/logo.svg"} width={150} height={80} />
        <Image
          alt="panel"
          src={"/login/maintenance.svg"}
          width={504}
          height={433}
          className="max-sm:w-[280px] max-sm:h-[300px]"
        />
        <Typography
          color="maintenance"
          fontSize="title"
          align="center"
          Inter="inter 28"
          className="max-sm:text-[24px]"
        >
          Under Maintenance
        </Typography>
        <div>
          <Typography color="secondary" align="center" fontSize="caption">
          Sorry, the page you’re looking for is currently under maintenance and will back soon.
          </Typography>
        </div>
      </div>
    </div>
  );
}
