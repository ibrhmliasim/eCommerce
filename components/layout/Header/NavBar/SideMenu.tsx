// components/layout/Header/navbar/SideMenu.tsx
"use client";

import Link from "next/link";

type SideMenuProps = {
    open: boolean;
    onClose: () => void;
};

export function SideMenu({ open, onClose }: SideMenuProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Menu */}
            <aside className="absolute left-0 top-0 h-full w-72 bg-transparent py-40 px-18">
                <div className="flex items-center justify-between mb-6">
                    <nav className="flex flex-col gap-5 text-lg font-medium">
                        <Link href="/womens" onClick={onClose}>WOMAN</Link>
                        <Link href="/mens" onClick={onClose}>MAN</Link>
                        <Link href="/kids" onClick={onClose}>KIDS</Link>
                        <Link href="/sale" onClick={onClose}>ON SALE</Link>
                        <Link href="/sale" onClick={onClose}>PLUSH HOME</Link>
                        <Link href="/sale" onClick={onClose}>PLUSH BEAUTY</Link>
                    </nav>
                </div>
            </aside>
        </div>
    );
}
