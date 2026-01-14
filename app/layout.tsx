// /Users/asimibrahimli/e-commerce/app/layout.tsx

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer";

import type { Metadata } from "next";

import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hankenSans = Hanken_Grotesk({
  variable: "--font-hanken-sans",
  subsets: ["latin"],
});

const hankenMono = Hanken_Grotesk({
  variable: "--font-hanken-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plush Wear",
  description: "Created By ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenSans.variable} ${hankenMono.variable} antialiased font-light`}>
        <Header />

        {/* app/page.tsx */}
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
