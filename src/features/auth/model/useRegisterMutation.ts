// src/features/auth/model/useRegisterMutation.ts

// register now creates a Sanctum session immediately (Auth::login() on the backend),
// invalidate + redirect to Main Page.
// Email verification サイトへのアクセスをブロックしません (ADR-8), checkoutだけ.

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionApi } from '@/features/auth/api/session.api';
import { queryKeys } from '@/shared/api/queryKeys';

import { RegisterPayload } from '@/features/auth/model/auth.types';

export const useRegisterMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterPayload) => sessionApi.register(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
            router.replace('/register/success');
        },

        onError: (error: Error) => {
            console.error('Register Error:', error);
        },
    });
};