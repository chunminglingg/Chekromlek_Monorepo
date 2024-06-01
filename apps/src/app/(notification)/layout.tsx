import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Logo from "@/components/Atoms/Logo/Logo";
import SideLeft from "@/components/Molecules/SideLeft/SideLeft";
import Nav from "@/components/Organisms/navbar/NavBefore";
import { Sidebar } from "@/components/Organisms/sidebar/Sidebar";
import NavAfter from "@/components/Organisms/navbar/NavAfter";
import CardContext from "@/contexts/PostCardContext/PostCardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chekromlek",
  description: `Chekromlek" is a social media platform dedicated to sharing creative projects. It provides a user-friendly interface for artists, designers, and entrepreneurs to showcase their work, connect with others, and inspire a global community of creators`,
  icons: "/icons/logo.svg",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavAfter />
        <div className="flex justify-center items-center h-full">
          <div className="h-[200px]"></div>
          {children}
        </div>
        <Sidebar />
      </body>
    </html>
  );
}
