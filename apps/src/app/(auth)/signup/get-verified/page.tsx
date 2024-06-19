"use client"
import { Typography } from "@/components";
import { Button } from "@/components/Atoms/Button/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../../globals.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [isError, setIsError] = useState(false);
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
      if (status === "error") {
        setIsError(true);
        setVerificationStatus(status);
      } else {
        setVerificationStatus("success");
        window.location.href = "/";
      }
    } else {
      setVerificationStatus("no-token");
    }
  };

  const verifyEmailToken = async (token: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/auth/verify?token=${token}`,
        { withCredentials: true }
      );
      console.log("response : ", response.data.status);
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
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Logo */}
      <div className="pt-10">
        <Image alt="panel" src="/login/logo.svg" width={150} height={80} />
      </div>

      {/* Conditional Rendering */}
      {isError ? (
        // Verified Error
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            alt="panel"
            src="/login/verify-error.svg"
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
            <span className="text-[#ff5959]">Error!</span> Verification, Please
            signup again!
          </Typography>
          <Button
            rounded="lg"
            colorOutline="none"
            colorScheme="primary"
            type="submit"
            className="hover:opacity-90"
          >
            <Link href="/signup">
              <Typography color="submit">Sign Up</Typography>
            </Link>
          </Button>
        </div>
      ) : (
        // Verified Success
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            alt="panel"
            src="/login/verify-sucess.svg"
            width={304}
            height={333}
            className="max-sm:w-[280px] max-sm:h-[300px]"
          />
          <Typography
            color="success"
            fontSize="normal"
            className="pt-10 text-lg font-medium"
          >
            Verified Successfully!
          </Typography>
          <Typography
            color="primary"
            fontSize="title"
            align="center"
            Inter="inter 28"
            className="max-sm:text-[24px]"
          >
            Thank you for signing up!
          </Typography>
          <Button
            rounded="lg"
            colorOutline="none"
            colorScheme="primary"
            type="submit"
            className="hover:opacity-90"
          >
            <Link href="/afterlogin">
              <Typography color="submit">Homepage</Typography>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
