import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import localFont from "next/font/local";

const deltha = localFont({
  src: [
    {
      path: "../public/assets/fonts/deltha/Deltha.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-deltha",
});
const terminal = localFont({
  src: [
    {
      path: "../public/assets/fonts/terminal-grotesque/terminal-grotesque.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-terminal",
});

export const metadata: Metadata = {
  title: "Enigma Digital",
  description: "Customer Boosters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${deltha.variable} ${terminal.variable} antialiased`}
      >
        <div className="bg-[url(/./assets/background.avif)] bg-cover bg-repeat w-full h-full">
          <div className="w-full h-full -z-[9999] bg-blur">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
