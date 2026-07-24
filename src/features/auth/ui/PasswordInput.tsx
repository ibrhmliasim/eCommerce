// shared/ui/PasswordInput.tsx

'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
    registration: UseFormRegisterReturn;
    label: string;
}

export const PasswordInput = ({ registration, label }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
        <div className="relative z-0 w-full group">
            <input
                {...registration}
                type={isVisible ? 'text' : 'password'}
                required
                placeholder=" "
                className="block py-2.5 px-0 pr-8 w-full text-sm text-black bg-transparent border-0 border-b border-neutral-700 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors duration-300"
            />
            <label className="peer-focus:font-normal absolute text-xs text-neutral-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                className="absolute right-0 top-2.5 text-neutral-500 hover:text-black transition-colors cursor-pointer z-10"
                aria-label={isVisible ? 'パスワードを隠す' : 'パスワードを表示'}
                tabIndex={-1}
            >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
  );
};