"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";


import { BurgerButton } from "./BurgerButton";
import { PrimaryCatalog } from "./PrimaryCatalog";

type SideMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function SideMenu({ open, onToggle, onClose }: SideMenuProps) {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Desktop Overlay */}
            <div
                onClick={onClose}
                className={`
                hidden md:block absolute inset-0
                bg-black/40 backdrop-blur-none
                transition-opacity duration-900
                ${open ? "opacity-90 pointer-events-auto" : "opacity-0"}
                `}
            />

            {/* Side Menu */}
            <aside
                className={`
                absolute left-0 top-0 h-full bg-white
                transition-transform duration-900 ease-out
                pointer-events-auto
                w-full md:w-3/4 lg:w-1/2
                ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-12 md:px-11 lg:px-15 pt-8">
                    {/* Desktop: Burger X + Logo */}
                    <div className="hidden md:flex items-center justify-start gap-12 ">
                        <BurgerButton open={open} onToggle={onToggle} />

                        <Image
                        src="/logo/logo.png"
                        alt="PLUSH"
                        width={220}
                        height={120}
                        priority
                        />
                    </div>

                    {/* Mobile: Burger X */}
                    <div className="flex md:hidden items-center justify-between w-full pt-4">
                        {/* BURGER BUTTON */}
                        <BurgerButton open={open} onToggle={onToggle} />

                        {/* MOBILE ICONS - Services */}
                        <nav className="flex flex-row gap-4 text-sm font-light tracking-wide">
                            <Link href="/search" className="flex items-center gap-3">
                                <Search size={24} strokeWidth={1} />
                            </Link>

                            <Link href="/cart" className="flex items-center gap-3">
                                <ShoppingBag size={24} strokeWidth={1} />
                            </Link>
                        </nav>

                    </div>
                </div>

                {/* Catalog */}
                <nav className="px-8 md:px-12 lg:px-16">
                    <PrimaryCatalog />
                </nav>
            </aside>
        </div>
    );
}
