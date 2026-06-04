// /Users/asimibrahimli/e-commerce/components/layout/Header/NavBar/SideMenu.tsx

"use client";

import Link from "next/link";
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
                transition-opacity duration-100
                ${open ? "opacity-90 pointer-events-auto" : "opacity-0"}
                `}
            />

            {/* Side Menu */}
            <aside
                className={`
                absolute left-0 md:top-40 h-full bg-white
                transition-transform duration-1000 ease-out
                pointer-events-auto w-full md:w-3/4 lg:w-1/2
                ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex md:hidden items-center justify-between px-3 pt-10">
                    {/* Desktop: Burger X + Logo will be our navbar and navbar will open or close */}


                    {/* Mobile: Burger X + NavItems */}
                    <div className="flex md:hidden items-center justify-between w-full">
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
                <nav className="px-3 md:px-12 lg:px-38">
                    <PrimaryCatalog />
                </nav>
            </aside>
        </div>
    );
}
