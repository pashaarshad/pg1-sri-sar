import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InviteModalListener } from "@/components/modals/InviteModalListener";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABC DEF PG",
  description: "PG Management System",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        {children}
        
        {/* Global Invite Link Modal Listener */}
        <InviteModalListener />
      </body>
    </html>
  );
}
