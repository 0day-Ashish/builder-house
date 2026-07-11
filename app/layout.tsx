import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LenisProvider from "../components/LenisProvider";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Builder House'26 - ft. TokenSupply",
  description: "Bilder House'26 is a fully sponsored 4-week intensive bootcamp by TokenSupply in Bengaluru for developers, designers, and engineers passionate about building products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <LenisProvider>{children}</LenisProvider>
        <Analytics/>
      </body>
    </html>
  );
}



