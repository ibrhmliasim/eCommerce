// app/(auth)/register/page.tsx

import { RegisterForm } from "@/features/auth/ui/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="h-screen w-full flex bg-white overflow-hidden">
            
            {/* ЛЕВАЯ ЧАСТЬ: ЛОГОТИП + ФОРМЫ */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-12 overflow-y-auto">

                {/* 1. LOGO */}
                <header className="w-full">
                    <Link href="/" className="inline-block text-black">
                        <Image
                            src="/logo/logo1.svg"
                            alt="PLUSH"
                            width={140}
                            height={35}
                            priority
                        />
                    </Link>
                </header>

                {/* 2. MAIN CONTENT */}
                <main className="w-full max-w-md mx-auto my-auto py-8 space-y-8">
                    
                    {/* HEADER */}
                    <div className="space-y-2">
                        <h1 className="text-xl font-normal tracking-widest uppercase text-black">
                            Create Account
                        </h1>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">
                            Personal details
                        </p>
                    </div>

                    {/* FORM */}
                    <RegisterForm />

                    {/* SOCIAL Register */}
                    <div className="space-y-4 pt-4 max-w-lg">
                        <p className="text-[12px] text-neutral-800 uppercase tracking-widest">
                            Or Register With
                        </p>
                        {/* flex-wrap allows buttons to wrap nicely on the next line on small screens */}
                        <div className="flex flex-wrap gap-3">
                            <button className="py-2 px-4 cursor-pointer border border-black text-black text-[11px] uppercase tracking-widest font-normal hover:bg-black hover:text-white transition-all duration-300">
                                Google
                            </button>
                            <button className="py-2 px-4 cursor-pointer border border-black text-black text-[11px] uppercase tracking-widest font-normal hover:bg-black hover:text-white transition-all duration-300">
                                Facebook
                            </button>
                        </div>
                    </div>

                </main>

                {/* 3. ALREADY HAVE AN ACCOUNT PROMO */}
                <footer className="w-full max-w-md mx-auto border-t border-neutral-100 pt-6">
                    <div className="space-y-4">
                        <h2 className="text-xs font-medium tracking-widest uppercase text-black">
                            Already Registered?
                        </h2>
                        <p className="text-[11px] text-neutral-500 leading-relaxed tracking-wide">
                            Log in to view your orders, access your saved items in wishlist, and manage your account settings.
                        </p>
                        <Link 
                            href="/login" 
                            className="inline-block text-center w-full border border-black text-black text-[11px] py-3.5 uppercase tracking-widest font-normal hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Log In To Your Account
                        </Link>
                    </div>
                </footer>

            </div>

            {/* RIGHT SIDE: INTERIOR / FASHION BANNER (Hidden on mobile phones hidden, visible from lg:flex) */}
            <div className="hidden lg:flex lg:w-1/2 h-full relative bg-neutral-100">
                <Image
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
                    alt="Plush Brand Register Campaign"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/2 pointer-events-none" />
            </div>

        </div>
    );
}