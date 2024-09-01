import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="plane-background w-full h-full relative">
      <div className="absolute left-0 top-0 h-full w-full bg-blue opacity-50 z-10"></div>
      {children}
    </div>
  );
}
