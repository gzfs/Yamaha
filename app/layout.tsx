import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Wrapper from "./_components/Wrapper";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Gemba",
  description: "Safety Reports Generator for Yamaha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Navbar />
          {children}
          <Toaster />
        </Wrapper>
      </body>
    </html>
  );
}
