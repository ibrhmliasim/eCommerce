// src/features/auth/ui/RegisterForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/features/auth/model/useRegisterMutation';
import { getErrorMessage } from '@/shared/lib/errorHandler';
import { RegisterPayload } from '@/features/auth/model/auth.types';

export const RegisterForm = () => {
    const { register, handleSubmit } = useForm<RegisterPayload>();
    const { mutate, isPending, error } = useRegisterMutation();

    return (
        <form 
            onSubmit={handleSubmit((data: RegisterPayload) => mutate(data))}
            className="flex flex-col space-y-6"
        >
            {/* FIRST & LAST NAME GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative z-0 w-full group">
                    <input 
                        {...register('first_name')} 
                        type="text"
                        required
                        placeholder=" " 
                        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                    />
                    <label className="peer-focus:font-normal absolute text-xs text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                        FIRST NAME
                    </label>
                </div>

                <div className="relative z-0 w-full group">
                    <input 
                        {...register('last_name')} 
                        type="text"
                        required
                        placeholder=" " 
                        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                    />
                    <label className="peer-focus:font-normal absolute text-xs text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                        LAST NAME
                    </label>
                </div>
            </div>

            {/* EMAIL INPUT */}
            <div className="relative z-0 w-full group">
                <input 
                    {...register('email')} 
                    type="email"
                    required
                    placeholder=" " 
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                />
                <label className="peer-focus:font-normal absolute text-xs text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                    E-MAIL
                </label>
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative z-0 w-full group">
                <input 
                    {...register('password')} 
                    type="password" 
                    required
                    placeholder=" " 
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
                />
                <label className="peer-focus:font-normal absolute text-xs text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                    PASSWORD
                </label>
            </div>

            {/* TERMS ACCEPTANCE NOTICE */}
            <p className="text-[10px] text-neutral-700 tracking-wide leading-relaxed">
                By creating an account, you agree to Plush’s <span className="underline cursor-pointer text-black">Privacy Policy</span> and <span className="underline cursor-pointer text-black">Terms of Service</span>.
            </p>

            {/* ERROR HANDLING */}
            {error && (
                <div className="text-xs text-red-600 tracking-wide bg-red-50 p-3 border border-red-200 uppercase text-center">
                    {getErrorMessage(error)}
                </div>
            )}

            {/* SUBMIT BUTTON */}
            <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-black text-white text-xs py-4 uppercase tracking-widest font-medium hover:bg-neutral-700/95 disabled:bg-neutral-300 
                        disabled:cursor-not-allowed transition-colors duration-100 cursor-pointer">
                {isPending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
        </form>
    );
};