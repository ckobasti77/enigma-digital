import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import localFont from "next/font/local";
import { ThemeProvider } from "./_components/ThemeProvider";

const deltha = localFont({
  src: [
    {
      path: "../public/assets/fonts/Deltha/Deltha.otf",
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

const aeonik = localFont({
  src: [
    {
      path: "../public/assets/fonts/aeonik/aeonik-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/aeonik/aeonik-light-italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/aeonik/aeonik-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/aeonik/aeonik-regular-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/aeonik/aeonik-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/aeonik/aeonik-bold-italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
});

const brokenConsole = localFont({
  src: [
    {
      path: "../public/assets/fonts/broken-console/broken-console.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/broken-console/broken-console-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-broken-console",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${deltha.variable} ${terminal.variable} ${aeonik.variable} ${brokenConsole.variable} font-aeonik antialiased`}
      >
        <ThemeProvider>
          <div className="app-shell bg-[url(/./assets/background.avif)] bg-cover bg-repeat">
            <Navbar />
            <div className="w-full h-full">{children}</div>
            <ScrollToTopButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
