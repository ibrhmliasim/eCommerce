// /app/(main)/layout.tsx

import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

import type { Metadata } from "next";

import { Hanken_Grotesk } from "next/font/google";

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

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
