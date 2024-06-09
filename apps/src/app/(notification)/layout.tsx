import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavAfter from "@/components/Organisms/navbar/NavAfter";
import { KhFont } from "@/utils/font";
import { SideBarLogin } from "@/components/Organisms/sidebar/SieBarLogin";

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
      <body className={KhFont.className}>
        <NavAfter />
        <div className="flex justify-center items-center h-full">
          <div className="h-[200px]"></div>
          {children}
        </div>
        <SideBarLogin />
      </body>
    </html>
  );
}
