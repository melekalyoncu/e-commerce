import "./globals.css";
import Providers from "./Providers";   
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My E-Commerce",
  description: "…",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="flex flex-col min-h-screen text-gray-700">
        <Providers>
          <Navbar />
          <main className="flex-grow bg-gray-50">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
