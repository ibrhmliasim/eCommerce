// If component: have onClick, have useState, have useEffect
// 👉 "use client"
"use client";

// IMPORT start
    import { useState } from "react";

    import Image from "next/image";
    import Link from "next/link";

    import { NavItem } from "./NavItem";
    import { BurgerButton } from "./BurgerButton";
    import { SideMenu } from "./SideMenu";
// IMPORT end

// EXPORT start
    export function NavBar() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <div className="container mx-auto flex items-center py-4">
                    {/* BURGER BUTTON */}
                    <BurgerButton onClick={() => setOpen(true)} />

                    <SideMenu
                        open={open}
                        onClose={() => setOpen(false)}
                    />

                    {/* LOGO */}
                    <Link href="/" className="flex justify-start gap-2">
                        <Image
                            src="/logo/logo.png"
                            alt="PLUSH"
                            width={210}
                            height={120}
                            priority
                        />
                    </Link>

                    <div className="ml-auto flex items-center justify-end gap-6">
                        {/* DESKTOP NAV */}
                        <nav className=" md:flex gap-6">
                            <NavItem href="/login" label="LOG IN" />
                            <NavItem href="/help" label="HELP" />
                            <NavItem href="/cart" label="CART" />
                        </nav>

                        {/* MOBILE ICONS */}
                        <nav className="flex md:hidden gap-4">
                            {/* <CartIcon />
                            <HelpIcon /> */}
                        </nav>
                    </div>

                </div>
            </>
        );
    }
// EXPORT end