// app/(auth)/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Plush Wear",
    description: "Created By ...",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex items-center justify-center">
            {children}
        </main>
    );
}
