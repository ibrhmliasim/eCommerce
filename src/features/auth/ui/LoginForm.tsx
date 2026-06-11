// @/features/auth/ui/LoginForm.tsx

'use client';

import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/features/auth/model/useLoginMutation';
import { getErrorMessage } from '@/shared/lib/errorHandler';
import { LoginPayload } from '@/features/auth/model/auth.types';

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginPayload>();
    const { mutate, isPending, error } = useLoginMutation();

    return (
        <form onSubmit={handleSubmit((data: LoginPayload) => mutate(data))}>
            <input {...register('email')} placeholder="Email" />
            <input {...register('password')} type="password" placeholder="Password" />

            <button type="submit" disabled={isPending}>
                {isPending ? 'Loading...' : 'Login'}
            </button>

            {error && <p>{getErrorMessage(error)}</p>}
        </form>
    );
};