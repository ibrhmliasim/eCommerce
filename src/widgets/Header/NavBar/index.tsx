// @/widgets/Header/NavBar/index.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, HelpCircle } from "lucide-react";

// Внутренние импорты остаются точечными, так как они в одной папке
import { NavItem } from "./NavItem";
import { BurgerButton } from "./BurgerButton";
import { SideMenu } from "./SideMenu";
import { SearchInput } from "@/features/search/SearchInput";

export function NavBar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleProfileClick = () => {
        // Здесь в будущем появится проверка: если авторизован -> router.push('/profile')
        // А пока просто жестко отправляем на логин
        router.push("/login");
    };
    const cartCount = 0;
    
    return (
        <>
            <div className="w-full max-w-8xl mx-auto px-4 sm:px-12 lg:px-12 pt-4 flex items-center justify-between font-light">
                {/* BURGER BUTTON */}
                <BurgerButton
                    open={open}
                    onToggle={() => setOpen(!open)}
                />

                <SideMenu
                    open={open}
                    onToggle={() => setOpen(!open)}
                    onClose={() => setOpen(false)}
                />

                {/* LOGO */}
                <Link href="/" className="flex pl-2 w-37.5 md:w-45 h-auto text-black">
                    <Image
                        src="/logo/logo1.svg"
                        alt="PLUSH"
                        width={320}
                        height={80}
                        priority
                    />
                </Link>

                {/* NAVIGATION SECTION */}
                <div className="ml-auto flex items-center justify-between gap-6">
                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex md:text-xs font-normal gap-7">
                        <SearchInput />
                        <NavItem href="/login" label="LOG IN" />
                        <NavItem href="/help" label="HELP" />
                        <NavItem href="/cart" label={`SHOPPING BAG 「 ${cartCount} 」`} />
                    </nav>

                    {/* MOBILE ICONS */}
                    <nav className="flex lg:hidden items-center gap-4">
                        <Link href="/search" aria-label="Search">
                            <Search size={24} strokeWidth={1} />
                        </Link>
                        <button onClick={handleProfileClick} aria-label="Account"className="text-black hover:opacity-70 transition-opacity">
                            <User size={24} strokeWidth={1} />
                        </button>
                        <Link href="/help" aria-label="Help">
                            <HelpCircle size={24} strokeWidth={1} />
                        </Link>
                        <Link href="/cart" aria-label="Shopping bag">
                            <ShoppingBag size={24} strokeWidth={1} />
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}