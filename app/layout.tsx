// /app/layout.tsx

import { AppProviders } from "@/shared/providers/AppProviders";
import './globals.css';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <html lang="en">
        <body className={`${hankenSans.variable} ${hankenMono.variable} antialiased font-light`}>
            <AppProviders>
                <main>{children}</main>
            </AppProviders>
        </body>
    </html>
    );
}
