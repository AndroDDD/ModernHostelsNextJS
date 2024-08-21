import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SaveCurrentPathnameToCookie } from "./generalFunctions/saveCurrentPathnameToCookie";
import HeaderScripts from "./ui/headerAndFooter/header/headerScripts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Hostels",
  description: "Rental Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider
        loginUrl="/rest-api/authentication/login"
        profileUrl="/rest-api/authentication/me"
      >
        <SaveCurrentPathnameToCookie />
        <head>
          <HeaderScripts />
        </head>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
