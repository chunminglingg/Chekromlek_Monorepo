import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Organisms/navbar/Nav";
import { Sidebar } from "@/components/Organisms/sidebar/Sidebar";
import CardContext from "@/contexts/PostCardContext/PostCardContext";
import SideRight from "@/components/Molecules/SideRight/SideRight";
import { KhFont } from "@/utils/font";
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
        <Nav />
        <div className="flex justify-center items-center h-full ">
          <CardContext>{children}</CardContext>
          <div className="absolute right-0 top-28 hidden lg:block">
            <SideRight></SideRight>
          </div>
        </div>
        <Sidebar />
      </body>
    </html>
  );
}
