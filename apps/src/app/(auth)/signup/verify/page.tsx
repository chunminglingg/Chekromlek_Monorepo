"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../../globals.css";
import { Typography } from "@/components";
import { Button } from "@/components/Atoms/Button/Button";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default async function verify() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );

  const handleVerifyEmail = async () => {
    if (token) {
      setVerificationStatus("verifying");
      const status = await verifyEmailToken(token);
      console.log("status: ", status);
      if (status == "error") {
        setVerificationStatus(status);
      } else {
        setVerificationStatus("success");
        window.location.href = "/afterlogin";
      }
    } else {
      setVerificationStatus("no-token");
    }
  };

  const verifyEmailToken = async (token: string) => {
    try {
      console.log("token : ", token);
      const response = await axios.get(
        `http://localhost:3000/v1/auth/verify?token=${token}`,
        { withCredentials: true }
      );
      return response.data.status;
    } catch (error) {
      console.error("Error verifying email:", error);
      return "error";
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  

  return (
    <div className="flex items-center justify-center  h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image alt="panel" src={"/login/logo.svg"} width={150} height={80} />
        <Image
          alt="panel"
          src={"/login/verify.svg"}
          width={304}
          height={333}
          className="max-sm:w-[280px] max-sm:h-[300px]"
        />
        <Typography
          color="primary"
          fontSize="title"
          align="center"
          Inter="inter 28"
          className="max-sm:text-[24px]"
        >
          Thank you for signing up!
        </Typography>
        <div>
          <Typography color="secondary" align="center">
            We will start soon and back again.
          </Typography>
          <Typography color="secondary" align="center">
            We will let you know when you can fully enjoy our service.
          </Typography>
        </div>
        <Button
          rounded="lg"
          colorOutline="none"
          colorScheme="primary"
          type="submit"
          className=" hover:opacity-90"
        >
          <Link href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"}>
            {" "}
            <Typography color="submit">Go to email</Typography>
          </Link>
        </Button>
      </div>
    </div>
  );
}
