// pages/signup/get-verified.tsx
"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import "../../../globals.css";

const Verification = dynamic(() => import("../../../../components/Organisms/Verification/Verification"), {
  ssr: false,
});

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Verification />
    </Suspense>
  );
};

export default Page;
