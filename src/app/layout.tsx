import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABC DEF PG",
  description: "PG Management System",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col md:flex-row pb-16 md:pb-0`}>
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav className="md:hidden" />
      </body>
    </html>
  );
}
