// Importing necessary dependencies and components from Next.js and other libraries
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Sidebar from "./components/sidebar/sidebar";
import { usePathname } from "next/navigation";
import StoreProvider from "./storeProvider";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// Importing Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Defining the RootLayout component
export default function RootLayout({
  children,
  showSidebar,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Body section */}
      <body className={inter.className}>
        <div className="flex gap-8">
          {/* Providing Redux store */}
          <StoreProvider>
            {/* Sidebar component */}
            <Sidebar />
            <div className="flex-1 pr-6">
              {/* Main content */}
              <div className="h-screen pt-10">{children}</div>
            </div>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
