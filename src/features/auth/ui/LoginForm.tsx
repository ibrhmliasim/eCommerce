// src/features/auth/ui/LoginForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useLoginMutation } from '@/features/auth/model/useLoginMutation';
import { getErrorMessage } from '@/shared/lib/errorHandler';
import { LoginPayload } from '@/features/auth/model/auth.types';

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginPayload>();
    const { mutate, isPending, error } = useLoginMutation();

    return (
        <form onSubmit={handleSubmit((data: LoginPayload) => mutate(data))} className="flex flex-col space-y-8">
            {/* EMAIL INPUT */}
            <div className="relative z-0 w-full group">
                <input 
                    {...register('email')} 
                    type="email"
                    required
                    placeholder=" " 
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-700 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                />
                <label className="peer-focus:font-normal absolute text-xs text-neutral-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                    E-MAIL
                </label>
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative z-0 w-full group">
                <input {...register('password')} type="password" required placeholder=" " 
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-700 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                />
                <label className="peer-focus:font-normal absolute text-xs text-neutral-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                    PASSWORD
                </label>
            </div>

            {/* FORGOT PASSWORD LINK */}
            <div className="flex justify-end">
                <Link href="/forgot-password" 
                    className="text-[12px] text-neutral-900 hover:text-black hover:underline tracking-wider uppercase transition-colors">

                    Forgot password?
                </Link>
            </div>

            {/* ERROR HANDLING */}
            {error && (
                <div className="max-w-lg text-xs text-red-600 tracking-wide bg-red-50 p-3 border border-red-200 uppercase text-center">
                    {getErrorMessage(error)}
                </div>
            )}

            {/* SUBMIT BUTTON */}
            <button type="submit" disabled={isPending}
                className="w-full bg-black text-white text-xs py-4 uppercase tracking-widest font-medium hover:bg-neutral-700/95 disabled:bg-neutral-300 
                        disabled:cursor-not-allowed transition-colors duration-100 cursor-pointer">
                {isPending ? 'LOGGING IN...' : 'LOG IN'}
            </button>
        </form>
    );
};