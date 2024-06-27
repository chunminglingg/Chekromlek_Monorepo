import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chekromlek",
  description: `Chekromlek" is a social media platform dedicated to sharing creative projects. It provides a user-friendly interface for artists, designers, and entrepreneurs to showcase their work, connect with others, and inspire a global community of creators`,
  icons: "/icons/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
