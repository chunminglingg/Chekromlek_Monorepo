import type { Metadata } from "next";
import "../globals.css";
import { KhFont } from "../../utils/font";
import { cookies } from "next/headers";
import { NavFetching } from "../../components/Organisms/navbar/NavFetching";
import SideRight from "../../components/Molecules/SideRight/SideRight";
import { SideLeft } from "../../components";

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
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  const sigSession = cookieStore.get("session.sig");

  return (
    <html lang="en">
      <body className={KhFont.className}>
        <div className="flex justify-center items-center h-full ">
          <NavFetching session={session} sigSession={sigSession} />
          {children}
        </div>
        <div className="fixed  top-5 left-5 z-30 w-62 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 max-lg:border-hidden flex flex-col gap-4 max-sm:hidden">
          <SideLeft session={session} sigSession={sigSession} />
        </div>
      </body>
    </html>
  );
}
