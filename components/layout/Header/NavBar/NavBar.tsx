// e-commerce/components/layout/Header/NavBar/NavBar.tsx

// If component: have onClick, have useState, have useEffect
// 👉 "use client"
"use client";

// IMPORT start
    import { useState } from "react";

    import Image from "next/image";
    import Link from "next/link";
    import { Search, ShoppingBag, User } from "lucide-react";

    import { NavItem } from "./NavItem";
    import { BurgerButton } from "./BurgerButton";
    import { SideMenu } from "./SideMenu";
    import { SearchInput } from "./SearchInput";
// IMPORT end

// EXPORT start
    export function NavBar() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <div className="container mx-auto flex items-center justify-between font-light">
                    {/* BURGER BUTTON */}
                    <BurgerButton
                        open={open}
                        onToggle={() => setOpen(v => !v)}
                    />

                    <SideMenu
                        open={open}
                        onToggle={() => setOpen(v => !v)}
                        onClose={() => setOpen(false)}
                    />

                    {/* LOGO */}
                    <Link href="/" className="flex ">
                        <Image
                            src="/logo/logo.png"
                            alt="PLUSH"
                            width={320}
                            height={150}
                            priority
                        />
                    </Link>

                    {/* NAVIGATION SECTION */}
                    <div className="ml-auto flex items-center justify-between gap-6">
                        {/* DESKTOP NAV */}
                        <nav className="hidden md:flex gap-6">
                            <SearchInput />
                            <NavItem href="/login" label="LOG IN" />
                            <NavItem href="/help" label="HELP" />
                            <NavItem href="/cart" label="SHOPPING BAG [0]" />
                        </nav>

                        {/* MOBILE ICONS */}
                        <nav className="flex md:hidden items-center gap-4">
                            <Link href="/search" aria-label="Search">
                                <Search size={24} strokeWidth={1} />
                            </Link>

                            <Link href="/login" aria-label="Account">
                                <User size={24} strokeWidth={1} />
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
// EXPORT end