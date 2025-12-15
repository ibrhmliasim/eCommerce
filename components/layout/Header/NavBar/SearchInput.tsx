"use client";

import { useRouter } from "next/navigation";

export function SearchInput() {
    const router = useRouter();
    return (
        <div
        onClick={() => router.push("/search")}
        className="
        hidden md:flex
        items-center gap-2
        cursor-pointer
        border-b border-black/40
        focus-within:border-black
        transition-colors
        "
        >

        <input
        type="text"
        placeholder="SEARCH"
        readOnly
        className="
            w-40
            bg-transparent
            text-sm
            tracking-wide
            placeholder:text-black/60
            focus:outline-none
            cursor-pointer
        "
        />
        </div>
    );
}
