"use clinet";

import Header from "@/components/Header";
import Player from "@/components/Player";
import SidebarNav from "@/components/SidebarNav";
import { Providers } from "@/store/provider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radio wave",
  description: "Surf in radio wave",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <div className="flex flex-row justify-start min-h-screen">
            <SidebarNav />
            <div className="flex-1 p-4 ">
              <Header />
              {children}
              <Player />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
