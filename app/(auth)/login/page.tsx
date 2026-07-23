// app/(auth)/login/page.tsx

import { LoginForm } from "@/features/auth/ui/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        /* flex h-screen - we force the entire screen to be a single block without unnecessary scrolling */
        <div className="h-screen w-full flex bg-white overflow-hidden">
            
            {/* LEFT PART: LOGO + FORMS (Takes up 100% on mobile and exactly half on desktop) */}
            <div className="w-full lg:w-1/3 h-full flex flex-col gap-2 md:gap-2 p-6 md:p-6 lg:p-8 overflow-y-auto">
                
                {/* LOGO */}
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

                {/* MIDDLE BLOCK */}
                <main className="max-w-lg px-3 sm:px-3 py-4 space-y-12">
                    
                    <div className="space-y-2">
                        <h1 className="text-xl font-normal tracking-widest uppercase text-black">
                            Log In
                        </h1>
                        <p className="text-xs text-neutral-800 uppercase tracking-wider">
                            Access to your Plush account
                        </p>
                    </div>

                    <LoginForm />

                    {/* SOCIAL SIGN IN */}
                    <div className="space-y-4 pt-4 max-w-lg">
                        <p className="text-[12px] text-neutral-800 uppercase tracking-widest">
                            Or Access With
                        </p>
                        {/* flex-wrap allows buttons to wrap nicely on the next line on small screens */}
                        <div className="flex flex-wrap gap-3">
                            <button className="bg-white text-black cursor-pointer border border-neutral-400 text-[11px] py-2 px-4 uppercase hover:border-black tracking-wider font-normal transition-colors duration-300">
                                Google
                            </button>
                            <button className="bg-white text-black cursor-pointer border border-neutral-400 text-[11px] py-2 px-4 uppercase hover:border-black tracking-wider font-normal transition-colors duration-300">
                                Facebook
                            </button>
                            <button className="bg-white text-black cursor-pointer border border-neutral-400 text-[11px] py-2 px-4 uppercase hover:border-black tracking-wider font-normal transition-colors duration-300">
                                QR Code
                            </button>
                        </div>
                    </div>
                </main>

                {/* REGISTER PROMO */}
                <footer className="max-w-lg pt-10 pl-3 sm:pl-3 border-t border-neutral-100 ">
                    <div className="space-y-4">
                        <h2 className="text-xs font-medium tracking-widest uppercase text-black">
                            New Here?
                        </h2>
                        <p className="text-[11px] text-neutral-500 leading-relaxed tracking-wide">
                            Join us for free to get seamless order tracking, fast checkout, and exclusive access to new collection drops and private sales.
                        </p>
                        <Link 
                            href="/register" 
                            className="inline-block text-center w-full border border-black text-black text-[11px] py-3.5 uppercase tracking-widest font-normal hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Create an Account
                        </Link>
                    </div>
                </footer>

            </div>

            {/* RIGHT SIDE: INTERIOR / FASHION BANNER (Hidden on mobile phones hidden, visible from lg:flex) */}
            <div className="hidden lg:flex lg:w-2/3 h-full relative bg-neutral-50">
                <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200"
                    alt="Plush Brand Campaign"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>

        </div>
    );
}