// app/(auth)/layout.tsx

import type { Metadata } from "next";
import '../globals.css';

export const metadata: Metadata = {
    title: "Plush Wear",
    description: "Created By ...",
};

import { Hanken_Grotesk } from "next/font/google";

const hankenSans = Hanken_Grotesk({
    variable: "--font-hanken-sans",
    subsets: ["latin"],
});

const hankenMono = Hanken_Grotesk({
    variable: "--font-hanken-mono",
    subsets: ["latin"],
});

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className={`${hankenSans.variable} ${hankenMono.variable} min-h-screen flex items-center justify-center antialiased font-light`}>
            {children}
        </main>
    );
}
