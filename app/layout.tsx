import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Provider from "@Components/Provider";
import Navbar from "@Components/Navbar";

export const metadata: Metadata = {
  title: "DreamScape",
  description: "Use AI to recount your Dreams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
